**만들 앱: "오늘의 감사 일기" (Daily Gratitude Journal)**

매일 감사한 일 3가지를 기록하고, 과거 기록을 되돌아보며 긍정적인 마음을 갖게 하는 앱입니다. 심리학적으로 입증된 감사 일기의 효과를 모바일로 구현합니다.

---

## 📱 Step 1: 개발 환경 설정

### 1-1. 필수 프로그램 설치

```bash
# Node.js 설치 확인 (18.x 이상)
node --version

# Node.js가 없다면 https://nodejs.org 에서 설치
```

### 1-2. Expo 프로젝트 생성

```bash
# 프로젝트 생성
npx create-expo-app expo-go_gratitude-journal --template blank

# 프로젝트 폴더로 이동
cd expo-go_gratitude-journal

# 개발 서버 시작
npx expo start
```

### 1-3. 스마트폰에서 테스트

1. 스마트폰에 **Expo Go** 앱 설치
   - [Android](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - [iOS](https://apps.apple.com/app/expo-go/id982107779)

2. QR 코드 스캔하여 앱 확인

---

## 💻 Step 2: 앱 코드 작성

### 2-1. 필요한 라이브러리 설치

```bash
# UI 라이브러리
npx expo install @react-navigation/native @react-navigation/bottom-tabs
npx expo install react-native-screens react-native-safe-area-context

# 로컬 저장소
npx expo install @react-native-async-storage/async-storage

# 아이콘
npx expo install @expo/vector-icons

# 날짜 처리
npm install date-fns
```

### 2-2. 프로젝트 구조 생성

```bash
mkdir -p src/screens src/components src/utils
```

### 2-3. 메인 앱 코드 작성



---

## 🧪 Step 3: 테스트

```bash
# 개발 서버 시작
npx expo start

# Expo Go 앱으로 QR 스캔하여 테스트
```

**테스트 항목:**
- ✅ 감사 일기 3가지 작성
- ✅ 저장 기능
- ✅ 히스토리 확인
- ✅ 날짜별 기록 확인

---

## 📦 Step 4: 플레이스토어 배포 준비

### 4-1. EAS CLI 설치

```bash
npm install -g eas-cli

# Expo 계정 로그인
eas login
```

### 4-2. 프로젝트 설정

```bash
# EAS 프로젝트 초기화
eas build:configure
```

### 4-3. app.json 수정

`app.json` 파일을 열어 앱 정보 수정:

```json
{
  "expo": {
    "name": "오늘의 감사",
    "slug": "gratitude-journal",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#FF6B6B"
    },
    "android": {
      "package": "com.yourname.gratitudejournal",
      "versionCode": 1,
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#FF6B6B"
      }
    },
    "ios": {
      "bundleIdentifier": "com.yourname.gratitudejournal",
      "buildNumber": "1.0.0"
    }
  }
}
```

### 4-4. 앱 아이콘 준비

앱 아이콘 이미지 필요:
- `icon.png` - 1024x1024px
- `adaptive-icon.png` - 1024x1024px (Android용)
- `splash.png` - 1284x2778px

**무료 아이콘 생성 사이트:**
- https://www.canva.com (추천)
- https://www.figma.com

---

## 🚀 Step 5: AAB 빌드

```bash
# Android용 AAB 파일 생성
eas build --platform android

# 빌드 완료 후 다운로드 링크 제공됨
```

**참고:** Free 플랜은 월 30회 빌드 가능

---

## 📱 Step 6: Google Play Console 등록

### 6-1. 개발자 계정 등록

1. [Google Play Console](https://play.google.com/console) 접속
2. 개발자 등록 ($25, 평생 1회)
3. 정보 입력 및 결제

### 6-2. 앱 만들기

1. "앱 만들기" 클릭
2. 앱 정보 입력:
   - **앱 이름**: 오늘의 감사
   - **기본 언어**: 한국어
   - **앱/게임**: 앱
   - **무료/유료**: 무료

### 6-3. 앱 정보 입력

**대시보드에서 완료해야 할 항목:**

1. **앱 콘텐츠**
   - 개인정보처리방침 URL (필수)
   - 광고 포함 여부
   - 타겟 연령층

2. **스토어 등록정보**
   - 앱 이름: 오늘의 감사
   - 간단한 설명: "매일 감사한 일을 기록하고 행복을 키워가는 일기 앱"
   - 자세한 설명:
     ```
     ✨ 오늘의 감사 - 행복을 키우는 감사 일기
     
     매일 감사한 일 3가지를 기록하세요.
     작은 행복을 발견하고, 긍정적인 마음을 키워갑니다.
     
     주요 기능:
     • 간단한 감사 일기 작성
     • 과거 기록 확인
     • 깔끔하고 따뜻한 디자인
     • 완전 무료, 광고 없음
     
     심리학 연구에 따르면 감사 일기는 
     행복도를 25% 증가시킨다고 합니다.
     
     지금 시작해보세요! 🌸
     ```

3. **그래픽**
   - 앱 아이콘 (512x512)
   - 스크린샷 최소 2개 (휴대전화용)
   - 기능 그래픽 (1024x500, 선택사항)

**스크린샷 만들기:**
- Expo Go에서 앱 실행 후 스크린샷 촬영
- Canva에서 예쁘게 편집

### 6-4. AAB 업로드

1. "프로덕션" → "새 버전 만들기"
2. EAS에서 다운로드한 `.aab` 파일 업로드
3. 버전 정보 입력
4. "검토" → "프로덕션으로 출시"

---

## ⏰ Step 7: 검토 대기

- Google 검토: 보통 1-3일 소요
- 승인 후 Play Store에서 검색 가능
- 거부 시 이유 확인 후 수정 재업로드

---

## 🎉 완성!
