delete AFRAME.components['look-controls'];
AFRAME.registerComponent('look-controls', {
  // To avoid recalculation at every mouse movement tick

  /**
   * look-controls. Update entity pose, factoring mouse, touch, and WebVR API data.
   */

  dependencies: ['position', 'rotation'],

  schema: {
    enabled: { default: true },
    magicWindowTrackingEnabled: { default: true },
    pointerLockEnabled: { default: false },
    reverseMouseDrag: { default: false },
    reverseTouchDrag: { default: false },
    touchEnabled: { default: true },
    mouseEnabled: { default: true }
  },

  init: function () {
    this.deltaYaw = 0;
    this.previousHMDPosition = new THREE.Vector3();
    this.hmdQuaternion = new THREE.Quaternion();
    this.magicWindowAbsoluteEuler = new THREE.Euler();
    this.magicWindowDeltaEuler = new THREE.Euler();
    this.position = new THREE.Vector3();
    this.magicWindowObject = new THREE.Object3D();
    this.rotation = {};
    this.deltaRotation = {};
    this.savedPose = null;
    this.pointerLocked = false;
    this.setupMouseControls();
    this.bindMethods();
    this.previousMouseEvent = {};

    this.setupMagicWindowControls();

    // To save / restore camera pose
    this.savedPose = {
      position: new THREE.Vector3(),
      rotation: new THREE.Euler()
    };

    // Call enter VR handler if the scene has entered VR before the event listeners attached.
    if (this.el.sceneEl.is('vr-mode') || this.el.sceneEl.is('ar-mode')) {
      this.onEnterVR();
    }
  },

  setupMagicWindowControls: function () {
    var magicWindowControls;
    var data = this.data;

    // Only on mobile devices and only enabled if DeviceOrientation permission has been granted.
    if (AFRAME.utils.device.isMobile() || AFRAME.utils.device.isMobileDeviceRequestingDesktopSite()) {
      magicWindowControls = this.magicWindowControls = new THREE.DeviceOrientationControls(
        this.magicWindowObject
      );
      if (typeof DeviceOrientationEvent !== 'undefined' && DeviceOrientationEvent.requestPermission) {
        magicWindowControls.enabled = false;
        if (this.el.sceneEl.components['device-orientation-permission-ui'].permissionGranted) {
          magicWindowControls.enabled = data.magicWindowTrackingEnabled;
        } else {
          this.el.sceneEl.addEventListener('deviceorientationpermissiongranted', function () {
            magicWindowControls.enabled = data.magicWindowTrackingEnabled;
          });
        }
      }
    }
  },

  update: function (oldData) {
    var data = this.data;

    // Disable grab cursor classes if no longer enabled.
    if (data.enabled !== oldData.enabled) {
      this.updateGrabCursor(data.enabled);
    }

    // Reset magic window eulers if tracking is disabled.
    if (oldData && !data.magicWindowTrackingEnabled && oldData.magicWindowTrackingEnabled) {
      this.magicWindowAbsoluteEuler.set(0, 0, 0);
      this.magicWindowDeltaEuler.set(0, 0, 0);
    }

    // Pass on magic window tracking setting to magicWindowControls.
    if (this.magicWindowControls) {
      this.magicWindowControls.enabled = data.magicWindowTrackingEnabled;
    }

    if (oldData && !data.pointerLockEnabled !== oldData.pointerLockEnabled) {
      this.removeEventListeners();
      this.addEventListeners();
      if (this.pointerLocked) {
        this.exitPointerLock();
      }
    }
  },

  tick: function (t) {
    var data = this.data;
    if (!data.enabled) {
      return;
    }
    this.updateOrientation();
  },

  play: function () {
    this.addEventListeners();
  },

  pause: function () {
    this.removeEventListeners();
    if (this.pointerLocked) {
      this.exitPointerLock();
    }
  },

  remove: function () {
    this.removeEventListeners();
    if (this.pointerLocked) {
      this.exitPointerLock();
    }
  },

  bindMethods: function () {
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
    this.onEnterVR = this.onEnterVR.bind(this);
    this.onExitVR = this.onExitVR.bind(this);
    this.onPointerLockChange = this.onPointerLockChange.bind(this);
    this.onPointerLockError = this.onPointerLockError.bind(this);
  },

  /**
   * Set up states and Object3Ds needed to store rotation data.
   */
  setupMouseControls: function () {
    this.mouseDown = false;
    this.pitchObject = new THREE.Object3D();
    this.yawObject = new THREE.Object3D();
    this.yawObject.position.y = 10;
    this.yawObject.add(this.pitchObject);
  },

  /**
   * Add mouse and touch event listeners to canvas.
   */
  addEventListeners: function () {
    var sceneEl = this.el.sceneEl;
    var canvasEl = sceneEl.canvas;

    // Wait for canvas to load.
    if (!canvasEl) {
      sceneEl.addEventListener('render-target-loaded', this.addEventListeners.bind(this));
      return;
    }

    // Mouse events.
    canvasEl.addEventListener('mousedown', this.onMouseDown, false);
    window.addEventListener('mousemove', this.onMouseMove, false);
    window.addEventListener('mouseup', this.onMouseUp, false);

    // Touch events.
    canvasEl.addEventListener('touchstart', this.onTouchStart);
    window.addEventListener('touchmove', this.onTouchMove);
    window.addEventListener('touchend', this.onTouchEnd);

    // sceneEl events.
    sceneEl.addEventListener('enter-vr', this.onEnterVR);
    sceneEl.addEventListener('exit-vr', this.onExitVR);

    // Pointer Lock events.
    if (this.data.pointerLockEnabled) {
      document.addEventListener('pointerlockchange', this.onPointerLockChange, false);
      document.addEventListener('mozpointerlockchange', this.onPointerLockChange, false);
      document.addEventListener('pointerlockerror', this.onPointerLockError, false);
    }
  },

  /**
   * Remove mouse and touch event listeners from canvas.
   */
  removeEventListeners: function () {
    var sceneEl = this.el.sceneEl;
    var canvasEl = sceneEl && sceneEl.canvas;

    if (!canvasEl) {
      return;
    }

    // Mouse events.
    canvasEl.removeEventListener('mousedown', this.onMouseDown);
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('mouseup', this.onMouseUp);

    // Touch events.
    canvasEl.removeEventListener('touchstart', this.onTouchStart);
    window.removeEventListener('touchmove', this.onTouchMove);
    window.removeEventListener('touchend', this.onTouchEnd);

    // sceneEl events.
    sceneEl.removeEventListener('enter-vr', this.onEnterVR);
    sceneEl.removeEventListener('exit-vr', this.onExitVR);

    // Pointer Lock events.
    document.removeEventListener('pointerlockchange', this.onPointerLockChange, false);
    document.removeEventListener('mozpointerlockchange', this.onPointerLockChange, false);
    document.removeEventListener('pointerlockerror', this.onPointerLockError, false);
  },

  /**
   * Update orientation for mobile, mouse drag, and headset.
   * Mouse-drag only enabled if HMD is not active.
   */
  updateOrientation: function () {
    var object3D = this.el.object3D;
    var pitchObject = this.pitchObject;
    var yawObject = this.yawObject;
    var sceneEl = this.el.sceneEl;

    // In VR or AR mode, THREE is in charge of updating the camera pose.
    if ((sceneEl.is('vr-mode') || sceneEl.is('ar-mode')) && sceneEl.checkHeadsetConnected()) {
      // With WebXR THREE applies headset pose to the object3D internally.
      return;
    }

    this.updateMagicWindowOrientation();

    // On mobile, do camera rotation with touch events and sensors.
    object3D.rotation.x = this.magicWindowDeltaEuler.x + pitchObject.rotation.x;
    object3D.rotation.y = this.magicWindowDeltaEuler.y + yawObject.rotation.y;
    object3D.rotation.z = this.magicWindowDeltaEuler.z;
  },

  updateMagicWindowOrientation: function () {
    var magicWindowAbsoluteEuler = this.magicWindowAbsoluteEuler;
    var magicWindowDeltaEuler = this.magicWindowDeltaEuler;
    // Calculate magic window HMD quaternion.
    if (this.magicWindowControls && this.magicWindowControls.enabled) {
      this.magicWindowControls.update();
      magicWindowAbsoluteEuler.setFromQuaternion(this.magicWindowObject.quaternion, 'YXZ');
      if (!this.previousMagicWindowYaw && magicWindowAbsoluteEuler.y !== 0) {
        this.previousMagicWindowYaw = magicWindowAbsoluteEuler.y;
      }
      if (this.previousMagicWindowYaw) {
        magicWindowDeltaEuler.x = magicWindowAbsoluteEuler.x;
        magicWindowDeltaEuler.y += magicWindowAbsoluteEuler.y - this.previousMagicWindowYaw;
        magicWindowDeltaEuler.z = magicWindowAbsoluteEuler.z;
        this.previousMagicWindowYaw = magicWindowAbsoluteEuler.y;
      }
    }
  },

  /**
   * Translate mouse drag into rotation.
   *
   * Dragging up and down rotates the camera around the X-axis (yaw).
   * Dragging left and right rotates the camera around the Y-axis (pitch).
   */
  onMouseMove: function (evt) {
    var direction;
    var movementX;
    var movementY;
    var pitchObject = this.pitchObject;
    var previousMouseEvent = this.previousMouseEvent;
    var yawObject = this.yawObject;

    // Not dragging or not enabled.
    if (!this.data.enabled || (!this.mouseDown && !this.pointerLocked)) {
      return;
    }

    // Calculate delta.
    if (this.pointerLocked) {
      movementX = evt.movementX || evt.mozMovementX || 0;
      movementY = evt.movementY || evt.mozMovementY || 0;
    } else {
      movementX = evt.screenX - previousMouseEvent.screenX;
      movementY = evt.screenY - previousMouseEvent.screenY;
    }
    this.previousMouseEvent.screenX = evt.screenX;
    this.previousMouseEvent.screenY = evt.screenY;

    // Calculate rotation.
    direction = this.data.reverseMouseDrag ? 1 : -1;
    yawObject.rotation.y += movementX * 0.002 * direction;
    // pitchObject.rotation.x += movementY * 0.002 * direction;
    // pitchObject.rotation.x = Math.max(-PI_2, Math.min(PI_2, pitchObject.rotation.x));
  },

  /**
   * Register mouse down to detect mouse drag.
   */
  onMouseDown: function (evt) {
    var sceneEl = this.el.sceneEl;
    if (
      !this.data.enabled ||
      !this.data.mouseEnabled ||
      ((sceneEl.is('vr-mode') || sceneEl.is('ar-mode')) && sceneEl.checkHeadsetConnected())
    ) {
      return;
    }
    // Handle only primary button.
    if (evt.button !== 0) {
      return;
    }

    var canvasEl = sceneEl && sceneEl.canvas;

    this.mouseDown = true;
    this.previousMouseEvent.screenX = evt.screenX;
    this.previousMouseEvent.screenY = evt.screenY;
    this.showGrabbingCursor();

    if (this.data.pointerLockEnabled && !this.pointerLocked) {
      if (canvasEl.requestPointerLock) {
        canvasEl.requestPointerLock();
      } else if (canvasEl.mozRequestPointerLock) {
        canvasEl.mozRequestPointerLock();
      }
    }
  },

  /**
   * Shows grabbing cursor on scene
   */
  showGrabbingCursor: function () {
    this.el.sceneEl.canvas.style.cursor = 'grabbing';
  },

  /**
   * Hides grabbing cursor on scene
   */
  hideGrabbingCursor: function () {
    this.el.sceneEl.canvas.style.cursor = '';
  },

  /**
   * Register mouse up to detect release of mouse drag.
   */
  onMouseUp: function () {
    this.mouseDown = false;
    this.hideGrabbingCursor();
  },

  /**
   * Register touch down to detect touch drag.
   */
  onTouchStart: function (evt) {
    if (
      evt.touches.length !== 1 ||
      !this.data.touchEnabled ||
      this.el.sceneEl.is('vr-mode') ||
      this.el.sceneEl.is('ar-mode')
    ) {
      return;
    }
    this.touchStart = {
      x: evt.touches[0].pageX,
      y: evt.touches[0].pageY
    };
    this.touchStarted = true;
  },

  /**
   * Translate touch move to Y-axis rotation.
   */
  onTouchMove: function (evt) {
    var direction;
    var canvas = this.el.sceneEl.canvas;
    var deltaY;
    var yawObject = this.yawObject;

    if (!this.touchStarted || !this.data.touchEnabled) {
      return;
    }

    deltaY = (2 * Math.PI * (evt.touches[0].pageX - this.touchStart.x)) / canvas.clientWidth;

    direction = this.data.reverseTouchDrag ? 1 : -1;
    // Limit touch orientation to to yaw (y axis).
    yawObject.rotation.y -= deltaY * 0.5 * direction;
    this.touchStart = {
      x: evt.touches[0].pageX,
      y: evt.touches[0].pageY
    };
  },

  /**
   * Register touch end to detect release of touch drag.
   */
  onTouchEnd: function () {
    this.touchStarted = false;
  },

  /**
   * Save pose.
   */
  onEnterVR: function () {
    var sceneEl = this.el.sceneEl;
    if (!sceneEl.checkHeadsetConnected()) {
      return;
    }
    this.saveCameraPose();
    this.el.object3D.position.set(0, 0, 0);
    this.el.object3D.rotation.set(0, 0, 0);
    if (sceneEl.hasWebXR) {
      this.el.object3D.matrixAutoUpdate = false;
      this.el.object3D.updateMatrix();
    }
  },

  /**
   * Restore the pose.
   */
  onExitVR: function () {
    if (!this.el.sceneEl.checkHeadsetConnected()) {
      return;
    }
    this.restoreCameraPose();
    this.previousHMDPosition.set(0, 0, 0);
    this.el.object3D.matrixAutoUpdate = true;
  },

  /**
   * Update Pointer Lock state.
   */
  onPointerLockChange: function () {
    this.pointerLocked = !!(document.pointerLockElement || document.mozPointerLockElement);
  },

  /**
   * Recover from Pointer Lock error.
   */
  onPointerLockError: function () {
    this.pointerLocked = false;
  },

  // Exits pointer-locked mode.
  exitPointerLock: function () {
    document.exitPointerLock();
    this.pointerLocked = false;
  },

  /**
   * Toggle the feature of showing/hiding the grab cursor.
   */
  updateGrabCursor: function (enabled) {
    var sceneEl = this.el.sceneEl;

    function enableGrabCursor() {
      sceneEl.canvas.classList.add('a-grab-cursor');
    }
    function disableGrabCursor() {
      sceneEl.canvas.classList.remove('a-grab-cursor');
    }

    if (!sceneEl.canvas) {
      if (enabled) {
        sceneEl.addEventListener('render-target-loaded', enableGrabCursor);
      } else {
        sceneEl.addEventListener('render-target-loaded', disableGrabCursor);
      }
      return;
    }

    if (enabled) {
      enableGrabCursor();
      return;
    }
    disableGrabCursor();
  },

  /**
   * Save camera pose before entering VR to restore later if exiting.
   */
  saveCameraPose: function () {
    var el = this.el;

    this.savedPose.position.copy(el.object3D.position);
    this.savedPose.rotation.copy(el.object3D.rotation);
    this.hasSavedPose = true;
  },

  /**
   * Reset camera pose to before entering VR.
   */
  restoreCameraPose: function () {
    var el = this.el;
    var savedPose = this.savedPose;

    if (!this.hasSavedPose) {
      return;
    }

    // Reset camera orientation.
    el.object3D.position.copy(savedPose.position);
    el.object3D.rotation.copy(savedPose.rotation);
    this.hasSavedPose = false;
  }
});

// delete AFRAME.components['nipple-controls'];

// import nipplejs from "nipplejs";

// AFRAME.registerComponent("nipple-controls", {
//   schema: {
//     enabled: { default: true },
//     mode: { default: "dynamic", oneOf: ["static", "semi", "dynamic"] },
//     rotationSensitivity: { default: 1.0 },
//     moveJoystickEnabled: { default: true },
//     lookJoystickEnabled: { default: false },
//     sideMargin: { default: "30px" },
//     bottomMargin: { default: "70px" },
//     moveJoystickPosition: { default: "left", oneOf: ["left", "right"] },
//     lookJoystickPosition: { default: "right", oneOf: ["left", "right"] },
//   },

//   init() {
//     this.dVelocity = new THREE.Vector3();
//     this.lookVector = new THREE.Vector2();
//     const lookControls = this.el.querySelector("[look-controls]").components["look-controls"];
//     this.pitchObject = lookControls.pitchObject;
//     this.yawObject = lookControls.yawObject;
//     this.rigRotation = this.el.object3D.rotation;
//     this.moveData = undefined;
//     this.lookData = undefined;
//     this.moving = false;
//     this.rotating = false;
//   },

//   update(oldData) {
//     if (
//       this.data.moveJoystickPosition !== oldData.moveJoystickPosition ||
//       this.data.sideMargin !== oldData.sideMargin ||
//       this.data.bottomMargin !== oldData.bottomMargin ||
//       this.data.mode !== oldData.mode
//     ) {
//       this.removeMoveJoystick();
//     }
//     if (
//       this.data.lookJoystickPosition !== oldData.lookJoystickPosition ||
//       this.data.sideMargin !== oldData.sideMargin ||
//       this.data.bottomMargin !== oldData.bottomMargin ||
//       this.data.mode !== oldData.mode
//     ) {
//       this.removeLookJoystick();
//     }
//     if (this.data.enabled && this.data.moveJoystickEnabled) {
//       this.createMoveJoystick();
//     } else {
//       this.removeMoveJoystick();
//     }
//     if (this.data.enabled && this.data.lookJoystickEnabled) {
//       this.createLookJoystick();
//     } else {
//       this.removeLookJoystick();
//     }
//   },

//   pause() {
//     this.moving = false;
//     this.rotating = false;
//   },

//   remove() {
//     this.removeMoveJoystick();
//     this.removeLookJoystick();
//   },

//   isVelocityActive() {
//     return this.data.enabled && this.moving;
//   },

//   getVelocityDelta() {
//     this.dVelocity.set(0, 0, 0);
//     if (this.isVelocityActive()) {
//       const force = this.moveData.force < 1 ? this.moveData.force : 1;
//       const angle = this.moveData.angle.radian;
//       const x = Math.cos(angle) * force;
//       const z = -Math.sin(angle) * force;
//       this.dVelocity.set(x, 0, z);
//     }
//     return this.dVelocity; // We don't do a clone() here, the Vector3 will be modified by the calling code but that's fine.
//   },

//   isRotationActive() {
//     return this.data.enabled && this.rotating;
//   },

//   updateRotation(dt) {
//     if (!this.isRotationActive()) return;

//     const force = this.lookData.force < 1 ? this.lookData.force : 1;
//     const angle = this.lookData.angle.radian;
//     const lookVector = this.lookVector;
//     lookVector.x = Math.cos(angle) * force;
//     lookVector.y = Math.sin(angle) * force;
//     lookVector.multiplyScalar((this.data.rotationSensitivity * dt) / 1000);

//     this.yawObject.rotation.y -= lookVector.x;
//     let x = this.pitchObject.rotation.x + lookVector.y;
//     x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, x));
//     this.pitchObject.rotation.x = x;
//   },

//   tick: function (t, dt) {
//     this.updateRotation(dt);
//   },

//   initLeftZone() {
//     const leftZone = document.createElement("div");
//     leftZone.setAttribute("id", "joystickLeftZone");
//     leftZone.setAttribute(
//       "style",
//       `position:absolute;${this.data.moveJoystickPosition}:${this.data.sideMargin};bottom:${this.data.bottomMargin};z-index:1`
//     );
//     document.body.appendChild(leftZone);
//     this.leftZone = leftZone;
//   },

//   initRightZone() {
//     const rightZone = document.createElement("div");
//     rightZone.setAttribute("id", "joystickRightZone");
//     rightZone.setAttribute(
//       "style",
//       `position:absolute;${this.data.lookJoystickPosition}:${this.data.sideMargin};bottom:${this.data.bottomMargin};z-index:1`
//     );
//     document.body.appendChild(rightZone);
//     this.rightZone = rightZone;
//   },

//   createMoveJoystick() {
//     if (this.moveJoystick) return;
//     this.initLeftZone();
//     const options = {
//       mode: this.data.mode,
//       zone: this.leftZone,
//       color: "white",
//       fadeTime: 0,
//     };
//     this.leftZone.style.width = "100px";
//     if (this.data.mode === "static") {
//       this.leftZone.style.height = "100px";
//       options.position = { left: "50%", bottom: "50%" };
//     } else {
//       this.leftZone.style.height = "400px";
//     }

//     this.moveJoystick = nipplejs.create(options);
//     this.moveJoystick.on("move", (evt, data) => {
//       this.moveData = data;
//       this.moving = true;
//     });
//     this.moveJoystick.on("end", (evt, data) => {
//       this.moving = false;
//     });
//   },

//   createLookJoystick() {
//     if (this.lookJoystick) return;
//     this.initRightZone();
//     const options = {
//       mode: this.data.mode,
//       zone: this.rightZone,
//       color: "white",
//       fadeTime: 0,
//     };
//     this.rightZone.style.width = "100px";
//     if (this.data.mode === "static") {
//       this.rightZone.style.height = "100px";
//       options.position = { left: "50%", bottom: "50%" };
//     } else {
//       this.rightZone.style.height = "400px";
//     }

//     this.lookJoystick = nipplejs.create(options);
//     this.lookJoystick.on("move", (evt, data) => {
//       this.lookData = data;
//       this.rotating = true;
//     });
//     this.lookJoystick.on("end", (evt, data) => {
//       this.rotating = false;
//     });
//   },

//   removeMoveJoystick() {
//     if (this.moveJoystick) {
//       this.moveJoystick.destroy();
//       this.moveJoystick = undefined;
//     }

//     this.moveData = undefined;

//     if (this.leftZone && this.leftZone.parentNode) {
//       this.leftZone.remove();
//       this.leftZone = undefined;
//     }
//   },

//   removeLookJoystick() {
//     if (this.lookJoystick) {
//       this.lookJoystick.destroy();
//       this.lookJoystick = undefined;
//     }

//     this.lookData = undefined;

//     if (this.rightZone && this.rightZone.parentNode) {
//       this.rightZone.remove();
//       this.rightZone = undefined;
//     }
//   },
// });