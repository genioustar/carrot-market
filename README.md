# nextjs 13 설치 과정

npx create-next-app@latest --typescript

## 이거할때 기본으로 선택 되어있는거 하기 yes-no-no

# tailwindcss설치

npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# tailwindcss 클래스 자동정렬 플러그인

npm install -D prettier prettier-plugin-tailwindcss

# tailwindcss form 스타일링 관련 플러그인

npm install -D @tailwindcss/forms

# clone 받은뒤에 프로젝트 실행하려면

npm install

npm run build

npm run dev 이렇게 해야 변경한거 바로 먹음!

# vscode tips

멀티커서 다중입력을 할때 alt + 마우스 왼클릭!

# prisma 설치

npm i prisma -D
npx prisma init
생성된 .env파일과 prisma/schema.prisma 수정

# schema.prisma 변경시

프로젝트 폴더로가서 (ex.C:\Users\NY\ReactStudy\carrot-market)
npx prisma db push
해줘야 prisma에 추가됨!

# prisma studio 설치

npx prisma studio

# prisma client 설치(-D가 없는데 백엔드에서 실제로 이걸 사용할꺼라서 개발모드가 사라진거!)

npm install @prisma/client

# prisma eslint적용

settings.json 젤 밑에
"[prisma]": {
"editor.defaultFormatter": "Prisma.prisma"
}
추가!

# react-hook-form 설치

npm i react-hook-form

# TILIO 설치

npm i twilio

# SENDGRID 설치

npm install --save @sendgrid/mail

# iron-session 설치

npm i iron-session

# SWR 설치

npm i swr
