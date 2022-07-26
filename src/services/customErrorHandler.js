const authErrors = {
  "auth/expired-action-code": "O código da ação o ou link expirou.",
  "auth/user-disabled": "O usuário correspondente foi desativado.",
  "auth/user-not-found": "Login ou Senha incorreto(s).",
  "auth/weak-password": "A senha é muito fraca.",
  "auth/email-already-in-use": "E-mail já cadastrado anteriormente.",
  "auth/invalid-email": "O endereço de e-mail inválido",
  "auth/account-exists-with-different-credential":
    "Credencial já associada a outra conta.",
  "auth/credential-already-in-use": "Credencial já em uso.",
  "auth/timeout":
    "Excedido o tempo de resposta. Tente novamente em alguns minutos.",
  "auth/unsupported-persistence-type":
    "O ambiente não suporta esse tipo de persistência de dados",
  "auth/invalid-credential": "A credencial expirou ou está mal formada.",
  "auth/wrong-password": "Login ou Senha incorreto(s).",
  "auth/invalid-verification-code": "Código de verificação inválido.",
  "auth/invalid-verification-id": "ID de verificação inválido.",
  "auth/custom-token-mismatch": "O token está diferente do padrão solicitado.",
  "auth/invalid-custom-token": "O token fornecido não é válido.",
  "auth/captcha-check-failed": "Houve um erro na verificação do Captcha",
  "auth/invalid-phone-number": "Telefone está em um formato inválido.",
  "auth/missing-phone-number": "Telefone é requerido.",
  "auth/quota-exceeded": "Cota de SMS excedida.",
  "auth/popup-blocked": "Pop-up bloqueado pelo navegador.",
  "auth/popup-closed-by-user": "Pop-up foi fechado pelo usuário.",
  "auth/unauthorized-domain": "Domínio inautorizado.",
  "auth/invalid-user-token": "Token de usuário inválido",
  "auth/user-token-expired": "Token de usuário expirado",
  "auth/null-user": "O usuário atual é nulo.",
  "auth/network-request-failed": "Falha de conexão com a rede.",
  "auth/requires-recent-login":
    "Impossível autenticar, essa operação querer login recente",
  "auth/too-many-requests":
    "Login bloqueado depois de muitas falhas, tente novamente mais tarde.",
  "auth/web-storage-unsupported": "O navegador não suporta armazenamento.",
  "auth/invalid-claims":
    "Os atributos de cadastro personalizado são inválidos.",
  "auth/claims-too-large": "Requisição muito grande.",
  "auth/id-token-expired": "O token informado expirou.",
  "auth/id-token-revoked": "O token informado perdeu a validade.",
  "auth/project-not-found": "Nenhum projeto foi encontrado.",
  "auth/insufficient-permission": "Permissão insuficiente",
  "auth/internal-error": "Erro inesperado no servidor de autenticação.",
};

const getMessage = (errorCode) => {
  return authErrors[errorCode] ? authErrors[errorCode] : "Erro desconhecido";
};

export { getMessage };
