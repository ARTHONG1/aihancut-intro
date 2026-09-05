# AI한컷 Cosmic Intro · Code-only 0.2

Three.js + WebGL로 그리는 우주 → 달 너머 지구 → 인천대교 → 송도 오프닝입니다. 이미지·영상·외부 폰트 파일을 포함하지 않습니다. 지구의 표면 데이터는 실행 중 메모리에서 계산하며, 구름·빛·달의 표면·도시·수면 반사는 셰이더와 실제 3D 구조로 표현합니다.

## 설치

```sh
npm install @arthong1/cosmic-intro@0.2.0
npx cosmic-intro init
```

공개 게시 전 전달받은 tgz 파일로도 설치할 수 있습니다:

```sh
npm install ./arthong1-cosmic-intro-0.2.0.tgz
npx cosmic-intro init
```

브라우저의 버튼 이벤트나 effect에서:

```js
import {playIntro} from '@arthong1/cosmic-intro';
await playIntro({motion:'full',sound:true});
```

React / Next.js의 클라이언트 컴포넌트:

```jsx
'use client';
import {CosmicIntro} from '@arthong1/cosmic-intro/react';
export default function Opening(){return <CosmicIntro motion="auto"/>;}
```

`auto`는 운영체제의 동작 줄이기 설정을 따릅니다. 전체 비행을 의도적으로 실행할 때 `full`을 쓰세요. 소리는 사용자 클릭 등 브라우저 정책에 따라 재생됩니다.

## 설치 구조

`init`은 `.cosmic-intro.json` 설정을 쓰고, `public/aihancut-intro/releases/0.2.0/`에 JavaScript·CSS·플레이어 HTML을 복사합니다. `npm run build` 앞에서 자동 동기화되도록 기존 prebuild 명령을 보존하면서 `cosmic-intro sync`를 추가합니다. dev 서버를 켜기 전 init/sync가 필요합니다. 프레임워크 빌드 명령을 직접 실행하는 CI는 먼저 `npx cosmic-intro sync`를 실행하세요.

하위 경로 앱은 `npx cosmic-intro init --base-path /school/`로 설정하고 `playIntro({baseUrl:'/school/aihancut-intro/releases/0.2.0/'})`처럼 출력된 주소를 전달합니다. public 대신 다른 정적 폴더라면 `--public-dir static`을 사용합니다. 명령은 프레임워크의 base 설정 자체를 바꾸지 않습니다.

## API

- `playIntro({motion?,sound?,baseUrl?,timeoutMs?,onComplete?,onError?})` → Promise
- `closeIntro()` → 취소 및 기존 앱 화면 복원
- `version` → 설치된 패키지 버전
- 정상 완료 `{status:'completed',destination:'Incheon',reducedMotion:boolean}`
- 취소 `{status:'cancelled'}` / 실패 `{status:'error',error:{code,message}}`
- timeout 기본 45000ms, 범위 5000–120000ms, 숨겨진 탭에서는 정지

동시에 여러 번 호출하면 같은 플레이어를 사용합니다. 정상 완료 후 onComplete를 한 번 호출하고, 로딩 실패나 시간 초과 시 플레이어를 닫아 기존 앱을 계속 가리지 않습니다. 취소 시 onComplete/onError는 호출되지 않습니다. React 컴포넌트는 마운트당 한 번 실행하고 언마운트 시 취소합니다. 동시에 하나만 렌더링하세요.

## 그래픽과 성능

별·은하 입자, 태양 노이즈, 메모리에서 생성한 지구 표면, 절차적 구름과 대기광, 분화구 지형, 인스턴싱으로 그리는 건물·도로·교량 케이블, 움직이는 차량, 평면 반사 수면을 사용합니다. 초기 생성/셰이더 준비가 완료된 후 약 14초 비행을 시작합니다.

다운로드 용량이 작아도 실시간 계산은 필요합니다. WebGL2가 필요하며 기기에 따라 해상도를 낮춥니다. 직접 만든 대륙 윤곽과 도시 형태는 인천의 특징을 살린 예술적 재구성으로, 실제 위성지도나 측량 모델이 아닙니다. 사진을 코드 문자열에 숨겨 넣지 않았습니다. 수학적으로 만든 표면 텍스처는 GPU 메모리를 사용합니다.

## 라이선스

원본 코드는 MIT. 함께 포함한 Three.js·React 등의 라이선스는 THIRD-PARTY-LICENSES.txt에 있습니다. 0.2에는 외부 사진·텍스처 파일이 없습니다.
