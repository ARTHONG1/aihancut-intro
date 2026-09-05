# AI한컷 오프닝: 스크립트 하나로 연결

## 사용하는 웹앱에 넣을 코드

오프닝을 공개 HTTPS 주소에 배포한 뒤, 기존 웹앱의 body 끝에 다음 코드를 넣습니다. 주소는 예시이며 실제 배포 주소로 바꿔야 합니다. 별도의 npm 패키지, API 키, 이미지 복사는 필요 없습니다.

```html
<script src="https://YOUR-INTRO-HOST/intro.js"></script>
<script>
  AIHancutIntro.play({
    onComplete: () => {
      // 이때 오프닝은 자동으로 닫혔습니다.
      // 필요하면 기존 앱의 시작 처리나 화면 이동을 실행하세요.
    },
    onError: (error) => {
      // 로딩 실패 시에도 오프닝은 닫히고 기존 웹앱은 그대로 사용할 수 있습니다.
      console.warn(error.code);
    }
  });
</script>
```

한 번만 실행할지, 페이지를 열 때마다 실행할지는 호출하는 웹앱이 결정합니다. SDK는 쿠키나 저장소에 방문 기록을 남기지 않습니다. React/Next.js에서는 브라우저에서 스크립트 로드가 끝난 뒤 호출하세요. 모듈/SSR 코드에서 바로 window를 접근하지 않습니다.

## API

- `AIHancutIntro.play(options?)`: iframe을 전체 화면으로 표시합니다. 완료 후 약 0.38초 동안 사라지고 iframe·이벤트·타이머를 제거하며 기존 스크롤, 포커스와 inert 상태를 복원합니다. 동시에 다시 호출하면 현재 Promise를 반환합니다.
- `onComplete(result)`: 정상 완료하고 오프닝이 닫힌 뒤 한 번 호출합니다.
- `onError({code,message})`: 로딩/재생 오류 또는 시간 초과로 닫힌 뒤 호출합니다. 오류 때문에 기존 웹앱을 계속 가리지 않습니다.
- `sound`: 기본 `false`. `true`는 소리 재생을 요청하지만 브라우저의 자동 재생 정책을 우회하지 않습니다. 오프닝 안에서 클릭하면 소리를 활성화할 수 있습니다.
- `timeoutMs`: 기본 45000, 허용 5000–120000. 로딩과 재생을 합친 제한이며 숨겨진 탭에서는 카운트가 멈춥니다.
- `baseUrl`: 기본은 intro.js가 있는 디렉터리입니다. SDK를 다른 서버에 복사한 경우 실제 오프닝이 있는 공개 디렉터리 주소를 지정할 수 있습니다.
- `AIHancutIntro.close()`: 즉시 닫습니다. Esc 키도 같은 동작입니다.
- 반환 Promise는 `{status:'completed',destination:'Incheon'}`, `{status:'cancelled'}` 또는 `{status:'error',error:{code,message}}`로 완료됩니다. 정상 취소는 onComplete/onError를 호출하지 않습니다.

오프닝 내부는 격리된 iframe에서 실행되어 앱의 React 버전·전역 CSS와 섞이지 않습니다. 완료 신호는 발신 origin, iframe window, 매 실행의 임의 channel을 함께 확인합니다. iframe에는 부모 페이지 이동 권한을 부여하지 않습니다. 종료 시 도시는 3D 엔진의 기존 2.5D 사진 연출입니다.

## 로컬 확인

기존 개발 서버에서 `http://localhost:3000/integration.html`을 열면 호출 예제를 볼 수 있습니다. `/embed/`는 삽입 전용 화면이고 `/intro.js`는 SDK입니다. localhost 주소는 현재 컴퓨터에서만 접근할 수 있으므로 운영 웹앱에 그대로 사용하지 않습니다.

## 독립 배포

```sh
npm run build:embed
```

`embed-dist/` 전체를 정적 HTTPS 호스팅에 올립니다. 런타임 서버, 계정 로그인, API 키가 필요 없습니다. 구조는 다음과 같습니다.

```text
intro.js
index.html           # 작동하는 연결 예제
embed/index.html     # iframe 플레이어
assets/              # JS, CSS, 지구·달·인천 이미지와 출처
INTEGRATION.md
DEPLOY.txt
```

디렉터리 구조를 유지하면 도메인 루트뿐 아니라 `/cosmic/` 같은 하위 경로에도 배포할 수 있습니다. 배포 주소의 `intro.js`와 `embed/`가 로그인 없이 열려야 합니다. 호스팅의 iframe 차단 헤더가 있다면 임베드를 허용하도록 조정합니다. 호출하는 웹앱에 CSP가 있으면 오프닝 호스트를 `script-src` 및 `frame-src`에 허용합니다.

배포한 뒤 그 주소의 예제 페이지를 열면 실제 URL이 들어간 코드를 확인할 수 있습니다. 오프닝을 업데이트할 때 같은 주소에 다시 배포하면 연결한 웹앱은 다음 로딩부터 새 버전을 사용합니다. 캐시 정책에 따라 갱신 시점이 달라질 수 있습니다.

지구·달 텍스처와 인천 사진의 출처 및 이용조건은 `assets/*SOURCES.md`에 포함되어 있습니다. 배포 시 함께 유지하세요.

이 배포본은 GitHub Pages용 정적 파일입니다. 배포 후 사이트 첫 화면에서 실제 공개 주소가 포함된 연결 코드를 확인할 수 있습니다.
