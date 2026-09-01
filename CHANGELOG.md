# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.0.2](https://github.com/minkxx/attendr-mobile/compare/v0.0.1...v0.0.2) (2026-09-01)

### Features

- add @sentry/react-native dependency ([bcbf580](https://github.com/minkxx/attendr-mobile/commit/bcbf58057d61a0e876e5ca826e601ff4ce2e5651))
- add distance calculation for geofencing ([d54b523](https://github.com/minkxx/attendr-mobile/commit/d54b5232476b2c64802f07b4835a8f2354c84d63))
- add Sentry configuration variables to .env.example ([ac9ad8e](https://github.com/minkxx/attendr-mobile/commit/ac9ad8e181906e3f4c178b95986453cce1e1f3a2))
- enhance Sentry integration for geofencing tasks and user actions ([3e7bb7d](https://github.com/minkxx/attendr-mobile/commit/3e7bb7d44aaffd76a5770f9db6c97653677e3362))
- initialize Sentry for error tracking in RootLayout component ([9d2a541](https://github.com/minkxx/attendr-mobile/commit/9d2a541185178cd72256a2cc1a704c4f030d4338))
- integrate Sentry for error tracking in the app ([204577c](https://github.com/minkxx/attendr-mobile/commit/204577c550d7020164d21912271f3163eedb9da5))
- update metro configuration to use Sentry Expo config ([6dcfb4e](https://github.com/minkxx/attendr-mobile/commit/6dcfb4e7e1bd4953a459d517134ae09ee79951ef))

### Bug Fixes

- app crashing on geofence start ([39f06c5](https://github.com/minkxx/attendr-mobile/commit/39f06c5160f30658172d8fd43497472743f46793))

### 0.0.1 (2026-09-01)

### Features

- add app configuration ([3284055](https://github.com/minkxx/attendr-mobile/commit/32840550a79dd530dea2dfb0d52a350a692e24a0))
- add babel configuration for nativewind support ([6278525](https://github.com/minkxx/attendr-mobile/commit/62785254e35fb63818b721584b4d9fb337a8f5e8))
- add better auth client ([8a68dc9](https://github.com/minkxx/attendr-mobile/commit/8a68dc9a31e097d570ea3fa2e8645d583e72a1dc))
- add expo-location and expo-task-manager ([46e44ca](https://github.com/minkxx/attendr-mobile/commit/46e44ca0f6a30c06d463ab008fb5604bede8b4b8))
- add expo-location plugin configuration for Android background and foreground services ([871d8d9](https://github.com/minkxx/attendr-mobile/commit/871d8d9b18c96e5eae368defbaed15e2101e5c0f))
- add global CSS file with Tailwind directives ([0afae2b](https://github.com/minkxx/attendr-mobile/commit/0afae2bbe6248dd104ddc6f5536cab0a91fb3cee))
- add metro configuration for nativewind support ([09d51b7](https://github.com/minkxx/attendr-mobile/commit/09d51b79d5a2a9b6f53ffac176e332354cf9a472))
- add nativewind ([af05e72](https://github.com/minkxx/attendr-mobile/commit/af05e72af700f2237405d7a604babfdd2afd2c6d))
- add nativewind type definition to TypeScript configuration ([52af1b0](https://github.com/minkxx/attendr-mobile/commit/52af1b0266d59f94937fabe3bc0d838c61d2acff))
- add nativewind type definitions ([fef0d27](https://github.com/minkxx/attendr-mobile/commit/fef0d27061049477233a1b4b851f69daad980e80))
- add project snapshot to gitignore ([c88e1df](https://github.com/minkxx/attendr-mobile/commit/c88e1df37b352b02cc956c0ed39a29e315dfd311))
- add standard-version config file ([c9e9b23](https://github.com/minkxx/attendr-mobile/commit/c9e9b23e01bc81c8f763c62c8eaf6f90882a3fad))
- add standard-version package and standard-version scripts ([651f29c](https://github.com/minkxx/attendr-mobile/commit/651f29ce56e6e807e23de06b7b76e2da3bfa645d))
- add tailwind configuration for nativewind support ([b397920](https://github.com/minkxx/attendr-mobile/commit/b39792030464a8f324cc94a4f65f82f441cbaa64))
- add workflow permissions ([9ddcd93](https://github.com/minkxx/attendr-mobile/commit/9ddcd931154440f31f43a535b322b0d18451b6b4))
- implement geofencing functionality with location tracking ([d164851](https://github.com/minkxx/attendr-mobile/commit/d164851bbbf86bde7519cb43b96b193b62d36f07))
- import global CSS file in RootLayout component ([f5d7f9b](https://github.com/minkxx/attendr-mobile/commit/f5d7f9b1793ee5b9a8a3d719eac382b070f81409))
- initial commit ([42d48bb](https://github.com/minkxx/attendr-mobile/commit/42d48bbec9f058342b174efcc2594fb743db8df2))
- login screen ([e6645fa](https://github.com/minkxx/attendr-mobile/commit/e6645fadb90f49ad2cefe2f59e131332589b5b6f))
- redirect to login page if not authenticated ([b490fde](https://github.com/minkxx/attendr-mobile/commit/b490fde620a0c2d8cf0d0f93595c1d4dab09cd01))
- show authenticated user ([9784c0f](https://github.com/minkxx/attendr-mobile/commit/9784c0fd2c449b6ecb80942979452f55da2bc0d8))
- structure node-modules like standard npm ([b945f54](https://github.com/minkxx/attendr-mobile/commit/b945f54f4a0a0ff0a5b6a9b9683eb653108b5454))

### Bug Fixes

- broken lockfile ([20fd4b8](https://github.com/minkxx/attendr-mobile/commit/20fd4b85f58052546c35f14df0fe0bbf289ce126))
- broken lockfile ([4f43c5b](https://github.com/minkxx/attendr-mobile/commit/4f43c5bf17120a5556024799f056a17f2545e296))
- correct project name casing in app.json ([6cf8a01](https://github.com/minkxx/attendr-mobile/commit/6cf8a01c2df04818b28e0bfb59f630921a856cfd))
- fix broken pnpm lock file ([82033f5](https://github.com/minkxx/attendr-mobile/commit/82033f50e3ad003564986cc0521b20e3910196d2))
- package version mismatch ([a7674ff](https://github.com/minkxx/attendr-mobile/commit/a7674ffb25edadf1ca5b20bea8a373b84b334f45))
- update project name references from AttendEase to Attendr ([11d7751](https://github.com/minkxx/attendr-mobile/commit/11d77516f4dfa0251acdae95a7be322eabc84531))
