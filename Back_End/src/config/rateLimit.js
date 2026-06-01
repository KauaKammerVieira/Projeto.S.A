import rateLimit from "express-rate-limit"

export const limitGlobal = rateLimit ({
    windowMs: 10*60*1000,
    max:200,
    message:{
        error: 'Erro ao tentar acessar o poduto da pagina que não foi encontrado porque não achamos o que imposibilitou a gente de achar o erro, faz o l seu ladrãozinho de merda, se eu te achar na rua, você está fodido, 22 Bolsonaro 2026'
    },
    standardHeaders: true,
    legacyHeaders:false 
})

export const limitLocal = rateLimit ({
    windowMs:10*60*1000,
    max:10,
    message:{
        error: 'Erro ao processar a requisição: não foi possível concluir a operação solicitada devido a uma falha inesperada durante a validação e o processamento dos dados fornecidos. O sistema identificou inconsistências nos parâmetros enviados, que podem estar relacionados a campos obrigatórios ausentes, valores em formato inválido, tipos de dados incompatíveis ou até mesmo informações que não atendem às regras de negócio estabelecidas pela aplicação. Além disso, pode ter ocorrido um problema de comunicação com serviços internos ou externos, como banco de dados, APIs de terceiros ou módulos responsáveis pela autenticação e autorização, o que impediu a continuidade do fluxo esperado. Recomendamos que você revise cuidadosamente todas as informações enviadas na requisição, certificando-se de que os campos obrigatórios estão devidamente preenchidos, que não há caracteres inválidos ou dados fora do padrão esperado, e que os valores seguem as restrições definidas (como tamanho mínimo e máximo, formato de e-mail, datas válidas, entre outros). Caso esteja utilizando um token de autenticação, verifique se ele ainda é válido e se possui as permissões necessárias para executar a ação desejada. Também é importante garantir que sua conexão com a internet esteja estável e que não haja bloqueios de rede, firewall ou políticas de segurança impedindo a comunicação com o servidor. Se o problema persistir após todas essas verificações, tente realizar a operação novamente após alguns instantes, pois pode se tratar de uma instabilidade temporária no sistema. Caso o erro continue ocorrendo, entre em contato com o suporte técnico, fornecendo o máximo de detalhes possível sobre a ação realizada, incluindo dados enviados, horário da tentativa, mensagens exibidas e, se possível, logs ou capturas de tela que possam ajudar na análise. Essas informações são essenciais para identificar a causa raiz do problema e aplicar uma solução adequada de forma mais rápida e eficiente.'
    },
    standardHeaders: true,
    legacyHeaders:false
})