exports.handler = (event, context, callback) => {
  console.log(event)
  if(event.triggerSource === "CustomMessage_AdminCreateUser") {
    // Ensure that your message contains event.request.codeParameter. This is the placeholder for code that will be sent
    //event.response.smsMessage = "Welcome to the service. Your confirmation code is " + event.request.codeParameter;
    event.response.emailSubject = "セキュリティ講習サイト 招待メール";
    event.response.emailMessage = `ようこそ！ ${event.request.userAttributes.name} さん<br>セキュリティ講習サイトのURLは以下となります。<br>
url: https://dev.dyj9a9u2n3e2d.amplifyapp.com<br>ユーザー名: ${event.request.usernameParameter}<br>
メールアドレス: ${event.request.userAttributes["cognito:email_alias"]}<br>
初期パスワード: ${event.request.codeParameter}<br>
ユーザー名またはメールアドレスをユーザー名として利用できます。<br>
初回ログイン時にパスワード変更画面に遷移するので、パスワードの変更をお願いします。<br>`;
  }
  console.log(event)
  return event;
};
