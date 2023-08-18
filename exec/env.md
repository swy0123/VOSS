# 실행
## 자동 배포
- [젠킨스 주소](http://3.36.98.75:9090/)로 접속
- root / bella0303! 입력 후 접속
- voss-web(웹사이트), voss-server(서버) 각각 빌드

## 웹사이트 수동 배포
- 프로젝트를 서버 상에 clone
- /frontend/ 폴더 수준에서 `npm run dev` 실행
- [https://i9b106.p.ssafy.io/category](https://i9b106.p.ssafy.io/category)


## 서버 수동 배포
- 우선 jar 형태로 빌드하여 서버 인스턴스에 JDK만 설치되어 있으면 실행되도록 빌드
- ssh(scp) 프로토콜 혹은 GitLab 계정을 통해 서버에 `\build\libs\voss- 0.0.1-SNAPSHOT.jar` 파일을 서버의 `~/voss-server/` 로 옮기기
- 현재 서버 (3.36.98.75) 기준 실행 방법
    
    ```bash
    $ cd voss-server 
    $ nohup java -jar voss-0.0.1-SNAPSHOT.jar &
    ```
    
- 서버 종료 하는 방법
    
    ```bash
    $ ps -ef | grep java
    
    user      2954  2588  0 02:11 pts/6    00:00:00 grep --color=auto java
    user     23307     1  0 Jul26 ?        00:12:27 java -jar voss-0.0.1-SNAPSHOT.jar
    ```
    
    - 위와 같이 `ps -ef | grep java` 명령어를 입력하면 java 관련된 프로세스 표시됨
    - 현 서버에 해당하는 프로세스 번호, 위 예시에서는 [ 23307 ] 확인하고 아래와 같이 종료
    
    ```bash
    $ kill -9 23307
    ```

# 환경변수 목록 (로컬 환경, 젠킨스, 도커 파일에서 설정 요함)
- DB_URL=jdbc:mariadb://3.36.98.75:33060/voss
- DB_USERNAME=ikdsikddi
- DB_PASSWORD=iddkisdki
- ACCESS_EXPIRATION=3600000
- REFRESH_EXPIRATION=1209600000
- CHATGPT_API_KEY=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
- REDIS_HOST=3.36.98.75
- REDIS_PORT=6379
- REDIS_PASSWORD=bella0303!
- FIREBASE_SERVICE_KEY=/home/ubuntu/voss-server/serviceAccountKey.json
- SMTP_EMAIL=tmdwhd0713
- SMTP_PASSWORD=bella0303!
- MONGODB_HOST=myopenvidu.kro.kr
- MONGODB_PORT=33275
- MONGODB_DATABASE=voss
- AWS_S3_BUCKET=b106-voss
- AWS_ACCESS_KEY=AKIAXYQOT3HIM2PXVX52
- AWS_SECRET_KEY=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
- OPENVIDU_SECRET=ikdsikddi
- OPENVIDU_URL=https://i9b106.p.ssafy.io:9443
