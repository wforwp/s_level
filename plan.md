# 모바일 심리테스트 MVP 구현 계획 (가장 빠르고 간편한 방식)

## 1) 기술 스택 결정

가장 빠르게 만들고 배포하기 위해 아래 조합으로 고정한다.

- 프레임워크: Next.js (App Router) + TypeScript
- 스타일: Tailwind CSS
- 상태관리: React 내장 상태(useState) 중심 (MVP 기준 외부 상태관리 생략)
- 이미지 저장: html-to-image
- 공유: Web Share API + 링크 복사 fallback
- 배포: Vercel

이 조합은 초기 세팅이 빠르고, 모바일 최적화/공유/결과 페이지 확장까지 한 번에 처리하기 쉽다.

---

## 2) MVP 범위

- 시작 페이지: 성별/나이/별명 입력
- 설문 페이지: 총 6페이지 (문항 수: 7, 7, 8, 8, 8, 5)
- 진행 표시: 현재 페이지/전체 페이지, 진행률 바
- 답변 방식: 각 문항은 선택지 1개 선택
- 점수 계산: 선택지 점수 누적
- 결과 페이지:
  - 총점 기반 레벨 판정
  - 레벨 설명 문구 표시
  - 결과 카드 이미지 저장(PNG)
  - 공유(Web Share API 우선, 미지원 시 링크 복사/이미지 저장 안내)

---

## 3) 빠른 초기 세팅

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
npm install html-to-image
```

모바일 기준 기본 메타(viewport), 폰트, 컬러만 최소 설정한다.

---

## 4) 권장 폴더 구조

```txt
src/
  app/
    page.tsx                    # 시작 페이지(기본정보 입력 + 시작 버튼)
    test/
      page.tsx                  # 설문 진행 페이지(6개 섹션 순차 진행)
    result/
      page.tsx                  # 결과 페이지(레벨, 설명, 저장/공유)
    layout.tsx
    globals.css

  components/
    IntroForm.tsx               # 성별/나이/별명 입력 폼
    QuestionCard.tsx            # 단일 문항 + 선택지 UI
    ProgressBar.tsx             # 진행률 바
    ResultCard.tsx              # 이미지 캡처 대상 결과 카드
    ShareButtons.tsx            # 공유/저장 버튼 묶음

  data/
    questions.ts                # 6페이지 문항 데이터(7/7/8/8/8/5)
    levels.ts                   # 점수 구간별 레벨 정의

  lib/
    score.ts                    # 점수 합산/레벨 판정 로직
    storage.ts                  # sessionStorage 저장/복원 유틸
```

---

## 5) 데이터 구조 설계 (예시)

### 5-1) 사용자 기본정보

```ts
type UserProfile = {
  gender: "male" | "female" | "other";
  age: number;
  nickname: string;
};
```

### 5-2) 문항 데이터

```ts
type Option = {
  id: string;
  text: string;
  score: number;
};

type Question = {
  id: string;
  page: 1 | 2 | 3 | 4 | 5 | 6;
  text: string;
  options: Option[];
};
```

문항은 `questions.ts`에 하드코딩(JSON 형태)으로 시작하고, 추후 관리자 페이지/DB 연동은 확장으로 남긴다.

### 5-3) 레벨 정의

```ts
type LevelRule = {
  min: number;
  max: number;
  level: string;
  title: string;
  description: string;
};
```

`levels.ts`에서 점수 구간을 관리한다.

---

## 6) 페이지 흐름

1. `/` 진입
   - 성별/나이/별명 입력
   - 유효성 통과 시 `/test` 이동

2. `/test`
   - 페이지 단위 문항 렌더링 (1~6)
   - 각 페이지 문항 모두 선택해야 다음 페이지 가능
   - 중간 저장(sessionStorage)
   - 마지막 페이지 완료 시 점수 계산 후 `/result` 이동

3. `/result`
   - 총점/레벨/설명 출력
   - 결과 카드 이미지 저장 버튼
   - 공유 버튼(Web Share API)
   - 다시하기 버튼(상태 초기화 후 `/`)

---

## 7) 점수 계산/판정 규칙

- 선택지별 점수를 모두 합산하여 `totalScore` 생성
- `levels.ts`의 구간(min/max)에 따라 레벨 1개 매칭
- 동점/경계값은 구간 포함 규칙(`min <= score <= max`)으로 처리

예시:

- 0~39: Lv.1
- 40~69: Lv.2
- 70~99: Lv.3
- 100~129: Lv.4
- 130+: Lv.5

실제 구간은 문항 점수 범위를 계산해 조정한다.

---

## 8) 모바일 UX 우선 규칙

- 최대 컨테이너 폭 고정(`max-w-md`) + 중앙 정렬
- 터치 영역 최소 44px 이상
- 한 화면에 한 문항(또는 소수 문항) 배치하여 스크롤 피로 감소
- 하단 고정 CTA(다음/결과 보기)
- 전환 애니메이션은 가볍게(페이드/슬라이드)만 적용

---

## 9) 이미지 저장/공유 구현 방식

### 이미지 저장

- `ResultCard` 컴포넌트를 ref로 지정
- `html-to-image`로 PNG 생성
- 다운로드 파일명: `test-result-{nickname}.png`

### 공유

1순위: `navigator.share` 지원 시
- 제목/텍스트/현재 URL 공유

2순위: 미지원 시
- 결과 URL 클립보드 복사
- 사용자에게 "링크가 복사되었습니다" 토스트 표시

---

## 10) 개발 순서 (작업 체크리스트)

1. Next.js + Tailwind 프로젝트 생성
2. 라우트 3개(`/`, `/test`, `/result`) 기본 뼈대 생성
3. `questions.ts`, `levels.ts` 데이터 작성
4. 시작 폼 구현(성별/나이/별명 유효성)
5. 설문 페이지 구현(페이지별 문항 표시/응답 저장/다음 이동)
6. 점수 계산 + 레벨 판정 구현
7. 결과 페이지 UI + 카드 컴포넌트 구현
8. 이미지 저장(html-to-image) 연결
9. Web Share + 링크 복사 fallback 구현
10. 모바일 화면 점검(iPhone SE 폭 기준 우선)
11. Vercel 배포 및 실제 공유 테스트

---

## 11) 완료 기준(Definition of Done)

- 모바일에서 시작 > 설문 > 결과까지 오류 없이 1회 완주 가능
- 6페이지 문항 수가 정확히 7/7/8/8/8/5로 동작
- 결과 점수/레벨이 일관되게 계산됨
- 결과 이미지 저장이 동작
- 공유 버튼이 지원 브라우저에서 정상 동작, 미지원 환경 fallback 동작
- 새로고침 시 진행 상태 복원 또는 초기화 정책이 명확히 동작

---

## 12) 추후 확장(선택)

- 문항/레벨을 CMS 또는 DB로 관리
- 결과 카드 템플릿 다중 테마
- 소셜 미리보기 이미지 자동 생성(OG image route)
- 응답 통계 대시보드(관리자 전용)
