/* global AFRAME NAF THREE */

  // const asianModel = 'https://cdn.jsdelivr.net/gh/c-frame/valid-avatars-glb@c539a28/avatars/Asian/Asian_F_1_Busi.glb';
  // const defaultModel = asianModel;
  const defaultModel = 'https://cdn.jsdelivr.net/gh/c-frame/valid-avatars-glb@c539a28/avatars/Asian/Asian_F_1_Busi.glb'; // none, set via the UI
  const animationsCache = {};
  
  // // Temporary workaround for template declaration; see issue 167
  // NAF.schemas.getComponentsOriginal = NAF.schemas.getComponents;
  // NAF.schemas.getComponents = (template) => {
  //   if (!NAF.schemas.hasTemplate('#avatar-template')) {
  //     NAF.schemas.add({
  //       template: '#avatar-template',
  //       components: [
  //         'player-info',
  //         {
  //           component: 'position',
  //           requiresNetworkUpdate: NAF.utils.vectorRequiresUpdate(0.001),
  //         },
  //         {
  //           component: 'rotation',
  //           requiresNetworkUpdate: NAF.utils.vectorRequiresUpdate(0.5),
  //         },
  //         {
  //           selector: '.model',
  //           component: 'rotation',
  //           requiresNetworkUpdate: NAF.utils.vectorRequiresUpdate(0.5),
  //         },
  //       ],
  //     });
  //   }
  
  //   const components = NAF.schemas.getComponentsOriginal(template);
  //   return components;
  // };
  
  const y180Quaternion = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI);
  
  const truncate = (num) => Math.round(num * 100) / 100;
  
  // To sync head in VR
  
  AFRAME.registerComponent('player-info', {
    schema: {
      name: { type: 'string', default: 'anonymous' },
      color: { type: 'color', default: '#ffffff' },
      avatarSrc: { type: 'string', default: defaultModel },
      state: { type: 'string', default: 'Idle' },
      muted: { type: 'boolean', default: false },
      avatarPose: { type: 'string', default: 'stand', oneOf: ['stand', 'sit'] },
      seatRotation: { type: 'number', default: 0 },
    },
  
    init: function () {
      this.head = this.el.querySelector('.head');
      this.nametag = this.el.querySelector('.nametag');
      this.setAnimation = this.setAnimation.bind(this);
      this.setAnimationFromState = this.setAnimationFromState.bind(this);
      this.getAnimationMixer = this.getAnimationMixer.bind(this);
      this.removeAnimationMixer = this.removeAnimationMixer.bind(this);
      this.positionChanged = this.positionChanged.bind(this);
  
      this.isAtCloseDistance = this.isAtCloseDistance.bind(this);
      const maxDistance = 0.5;
      this.maxDistanceSquared = maxDistance * maxDistance;
      this.rig = document.querySelector('#rig');
  
    //   this.fbxLoader = new THREE.FBXLoader();
      this.glbLoader = new THREE.GLTFLoader();
      this.updatedEventDetail = { el: undefined, data: undefined, oldData: undefined };
    },
  
    update: function (oldData) {
      this.updatedEventDetail.data = this.data;
      this.updatedEventDetail.oldData = oldData;
      this.updatedEventDetail.el = this.el;
      this.el.sceneEl.emit('player-info-updated', this.updatedEventDetail);
      this.updatedEventDetail.data = undefined;
      this.updatedEventDetail.oldData = undefined;
      this.updatedEventDetail.el = undefined;
      // if (this.head) this.head.setAttribute('material', 'color', this.data.color);
      if (this.nametag) this.nametag.setAttribute('value', this.data.name);
  
      this.avatarEl = this.el.querySelector('.model');
  
      if (!this.avatarEl) {
        // our own avatar
        this.avatarEl = document.createElement('a-entity');
        this.el.appendChild(this.avatarEl);
        this.avatarEl.setAttribute('class', 'model');
      }
      this.avatarEl.setAttribute('shadow', '');
  
      this.el.object3D.rotation.order = 'YXZ';
      this.avatarEl.object3D.rotation.order = 'YXZ';
  
      if (oldData && this.data.avatarSrc && oldData.avatarSrc && this.data.avatarSrc !== oldData.avatarSrc) {
        this.mesh = undefined;
        // avatar-animation-mixer component references previous loaded model, remove it, it will be recreated in model-loaded
        this.removeAnimationMixer();
      }
      if (this.data.avatarSrc) {
        this.avatarEl.setAttribute('gltf-model', this.data.avatarSrc);
      }
  
      if (!this.mesh || !this.mixer) {
        return;
      }
  
      if (oldData && this.data && (oldData.state !== this.data.state || oldData.avatarPose !== this.data.avatarPose)) {
        this.setAnimationFromState();
      }
    },
  
    tick: function (t) {
      if (this.el.id !== 'rig') {
        this.el.object3D.visible = !this.isAtCloseDistance(this.rig.object3D, this.el.object3D);
      }
      if (this.mesh) {
        const morphTargetDictionary = this.mesh.morphTargetDictionary;
        if (t % 6000 < 500) {
          // every 6s
          this.startBlinking = true;
        }
        const valueQuick = (Math.sin(t / 100) + 1) / 2; // 0-1
        if (valueQuick < 0.3) {
          this.startBlinking = false;
          this.mesh.morphTargetInfluences[morphTargetDictionary['h_expressions.ReyeClose_h']] = 0;
          this.mesh.morphTargetInfluences[morphTargetDictionary['h_expressions.LeyeClose_h']] = 0;
        }
        if (this.startBlinking) {
          this.mesh.morphTargetInfluences[morphTargetDictionary['h_expressions.ReyeClose_h']] = valueQuick;
          this.mesh.morphTargetInfluences[morphTargetDictionary['h_expressions.LeyeClose_h']] = valueQuick;
        }
      }
    },
  
    setAnimation: function (props) {
      this.avatarEl.setAttribute('animation-mixer', props);
    },
  
    setAnimationFromState() {
      let clip = this.data.state;
      if (this.data.state === 'Idle') {
        clip = this.data.avatarPose === 'sit' ? 'SittingIdle' : 'Idle';
      }
  
      this.setAnimation(`clip:${clip};loop:repeat`);
    },
  
    getAnimationMixer: function () {
      return this.avatarEl.getAttribute('animation-mixer');
    },
  
    removeAnimationMixer: function () {
      this.avatarEl.removeAttribute('animation-mixer');
      this.mixer = null;
    },
  
    positionChanged() {
      if (this.el.sceneEl.systems.waypoint?.occupyWaypoint) {
        this.el.sceneEl.systems.waypoint.unoccupyWaypoint();
      }
  
      if (this.mixer) {
        clearTimeout(this.revertToIdleTimeout);
        this.revertToIdleTimeout = setTimeout(() => {
          this.el.setAttribute('player-info', 'state', 'Idle');
        }, 100);
        this.el.setAttribute('player-info', 'state', 'Walking');
      }
    },
  
    isAtCloseDistance: function (from, to) {
      const f = from.position;
      const t = to.position;
      const dx = f.x - t.x;
      const dz = f.z - t.z;
      const distanceSquared = dx * dx + dz * dz;
      const isClose = distanceSquared < this.maxDistanceSquared;
      return isClose;
    },
  
    events: {
      // from blink-controls
      teleported: function (evt) {
        this.positionChanged();
      },
      // from movement-controls
      moved: function (evt) {
        this.positionChanged();
      },
      // from cursor-teleport
      'navigation-start': function (evt) {
        if (this.el.sceneEl.systems.waypoint?.occupyWaypoint) {
          this.el.sceneEl.systems.waypoint.unoccupyWaypoint();
        }
  
        if (this.el.hasAttribute('simple-navmesh-constraint')) {
          this.el.setAttribute('simple-navmesh-constraint', 'enabled', false);
        }
  
        this.el.setAttribute('player-info', 'state', 'Walking');
      },
      'navigation-end': function (evt) {
        if (this.el.hasAttribute('simple-navmesh-constraint')) {
          this.el.setAttribute('simple-navmesh-constraint', 'enabled', true);
        }
  
        this.el.setAttribute('player-info', 'state', 'Idle');
      },
      'model-loaded': function (evt) {
        if (this.el.id === 'rig') {
          // Hide my own avatar
          // this.avatarEl.object3D.visible = false;
          this.avatarEl.object3D.traverse((obj) => {
            if (!obj.layers) return;
            obj.layers.disableAll();
            obj.layers.enable(3);
          });
        }
        this.avatarEl.object3D.traverse((obj) => {
          if (obj.isMesh) {
            obj.frustumCulled = false;
          }
        });
  
        const model = evt.detail.model;
        // Original fbx avatar has master->Reference->H_DDS_HighRes
        // meshoptimized glb avatar has Scene->H_DDS_HighRes, so we rename Scene to Armature and
        // map Reference to Armature when converting the animations, also ignoring the master.quaternion track that doesn't seem to do anything.
        model.name = 'Armature';
        this.mesh = model.getObjectByName('H_DDS_HighRes');
        if (!this.mesh) return;
        // window.mesh = this.mesh;
        // window.model = model;
  
        const callback = () => {
          model.animations = Array.from(animationsCache[cacheKey].animations);
          this.setAnimationFromState();
          this.mixer = this.getAnimationMixer();
        };
        const isWoman = this.data.avatarSrc.indexOf('_F_') > -1;
        const cacheKey = `valid-${isWoman}`;
        animationsCache[cacheKey] = animationsCache[cacheKey] || {};
        if (animationsCache[cacheKey].animations) {
          callback();
          return;
        }
  
        if (!animationsCache[cacheKey].promise) {
          const promise = new Promise((resolve, reject) => {
            (async () => {
              const animations = isWoman ? ANIMATIONS_WOMAN : ANIMATIONS_MAN;
              const convertedAnimations = [];
              for (let [animationName, url, options] of animations) {
                const loader = url.indexOf('.glb') > -1 ? this.glbLoader : this.fbxLoader;
                options = options ?? {};
                if (window.USE_GLITCH === false) {
                  url = new URL(url).pathname.split('/').pop();
                }
                const asset = await loader.loadAsync(url);
                const clip = asset.animations[0];
                let newClip = clip;
                clip.name = animationName;
                newClip = simpleRetargetClip(this.mesh, clip, {
                  hip: 'Hips',
                  names: { Reference: 'Armature' },
                  offsets: options.quatOffsets ?? {},
                  positionMultiplier: options.positionMultiplier ?? 1.0,
                  positionOffset: options.positionOffset ?? 0,
                  ignoreBones: options.ignoreBones ?? [],
                  removeHipsForwardAnimation: options.removeHipsForwardAnimation ?? false,
                });
                console.log('retargeted', clip.name, 'renamed to', animationName);
                convertedAnimations.push(newClip);
                console.log('animation after conversion', newClip);
              }
  
              animationsCache[cacheKey].animations = convertedAnimations;
              resolve();
            })();
          });
          animationsCache[cacheKey].promise = promise;
        }
        animationsCache[cacheKey].promise.then(callback).catch(() => {
          console.error('Error loading the animations');
        });
      },
    },
  });
  
  function getBones(skeleton) {
    return Array.isArray(skeleton) ? skeleton : skeleton.bones;
  }
  
  function getBoneByName(name, skeleton) {
    for (let i = 0, bones = getBones(skeleton); i < bones.length; i++) {
      if (name === bones[i].name) return bones[i];
    }
  }
  
  function simpleRetargetClip(target, clip, options = {}) {
    const names = options.names ?? {};
    const offsets = options.offsets ?? {};
    const positionMultiplier = options.positionMultiplier ?? 1.0;
    const inverseBones = options.inverseBones ?? false;
    const ignoreBones = options.ignoreBones ?? [];
    const removeHipsForwardAnimation = options.removeHipsForwardAnimation ?? false;
    const positionOffset = options.positionOffset ?? 0;
    const tracks = [];
    const quat = new THREE.Quaternion();
  
    clip.tracks.forEach((track) => {
      const trackSplitted = track.name.split('.');
      const mixamoRigName = trackSplitted[0];
      const boneName = names[mixamoRigName] || mixamoRigName;
      const propertyName = trackSplitted[1];
      const boneTo = getBoneByName(boneName, target.skeleton);
      if (!boneTo && boneName !== 'Armature') return;
      if (ignoreBones.indexOf(boneName) > -1) {
        console.log(clip.name, 'ignore track', boneName);
        return;
      }
  
      if (track instanceof THREE.VectorKeyframeTrack && track.name.endsWith('position') && options.hip === boneName) {
        const threetrack = new THREE.VectorKeyframeTrack(
          `${boneName}.${propertyName}`,
          track.times,
          track.values.map((v, i) => {
            v = v * positionMultiplier;
            if (removeHipsForwardAnimation && i % 3 === 1) {
              v = 0;
            }
            if (positionOffset !== 0 && i % 3 === 2) {
              v += positionOffset;
            }
            return v;
          }),
        );
        tracks.push(threetrack);
      } else if (track instanceof THREE.QuaternionKeyframeTrack) {
        const times = track.times;
        const values = track.values.map((v, i) => (inverseBones && i % 2 === 0 ? -v : v));
        const offset = offsets[boneName];
        if (offset) {
          const numFrames = track.values.length / 4;
          for (let i = 0; i < numFrames; ++i) {
            quat.fromArray(values, i * 4);
            quat.multiply(offset);
            quat.toArray(values, i * 4);
          }
        }
  
        const threetrack = new THREE.QuaternionKeyframeTrack(`${boneName}.${propertyName}`, times, values);
        tracks.push(threetrack);
      }
    });
  
    return new THREE.AnimationClip(clip.name, clip.duration, tracks);
  }
  
  function getQuatOffsetsFromEulers(rotations) {
    const offsets = {};
    for (const [boneName, rotation] of Object.entries(rotations)) {
      offsets[boneName] = new THREE.Quaternion().setFromEuler(
        new THREE.Euler(
          rotation[0] * THREE.MathUtils.DEG2RAD,
          rotation[1] * THREE.MathUtils.DEG2RAD,
          rotation[2] * THREE.MathUtils.DEG2RAD,
        ),
      );
    }
    return offsets;
  }