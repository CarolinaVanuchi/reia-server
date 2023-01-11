class MessagesUtils {
    static NULL_NAME                    = "NOME É OBRIGATÓRIO";
    static NULL_USERNAME                = "USUÁRIO É OBRIGATÓRIO";
    static NULL_PASSWORD                = "SENHA É OBRIGATÓRIO";
    static NULL_REPT_PASSWORD           = "REPETIR A SENHA É OBRIGATÓRIO";

    static NULL_IP                      = "IP É OBRIGATÓRIO";
    static NULL_PORT                    = "PORTA É OBRIGATÓRIO";
    static NULL_SAMPLING                = "AMOSTRAGEM É OBRIGATÓRIO";

    static NULL_GPIO                    = "PORTA É OBRIGATÓRIO";
    static NULL_GPIO_INPUT              = "ESCOLHER SE É ENTRADA OU SAÍDA É OBRIGATÓRIO";
    static NULL_TOPIC                   = "TÓPICO É OBRIGATÓRIO";

    static NULL_TYPE_DATA               = "TIPO DO VALOR É OBRIGATÓRIO";
    static NULL_MIN_DATA                = "VALOR MÍNIMO DO VALOR É OBRIGATÓRIO"; // 10C
    static NULL_MAX_DATA                = "VALOR MÁXIMO DO VALOR É OBRIGATÓRIO"; // 100C
    static NULL_TYPE_OUTPUT             = "TIPO DE VALOR RECEBIDO É OBRIGATÓRIO";
    static NULL_MIN_OUTPUT              = "MÁXIMO DO TIPO DE VALOR RECEBIDO É OBRIGATÓRIO"; // 0 - 10 V
    static NULL_MAX_OUTPUT              = "MÍNIMO DO TIPO DE VALOR RECEBIDO É OBRIGATÓRIO";

    static EQUAL_PASSWORD               = "SENHAS DEVEM SER IGUAIS";
    static EQUAL_USER                   = "JÁ EXISTE USUÁRIO CADASTRADO";
    static EQUAL_TOPIC                  = "TÓPICO JÁ CADASTRADO";
    static EXISTS_USER_PASSWORD         = "USUÁRIO/SENHA NÃO EXISTEM";
    static LOGIN_OK                     = "LOGIN REALIZADO, TOKEN:";
    static NOT_USER                     = "NÃO EXISTE O USUÁRIO";
    static DENID                        = "ACESSO NEGADO";
}

export default MessagesUtils;