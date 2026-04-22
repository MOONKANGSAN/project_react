# 1. Node 환경
FROM node:20-alpine

# 2. 작업 디렉토리
WORKDIR /app

# 3. 패키지 복사
COPY package*.json ./

# 4. 설치
RUN npm install

# 5. 소스 복사
COPY . .

# 6. 실행
CMD ["npm", "run", "dev"]