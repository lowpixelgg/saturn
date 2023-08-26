# Guia para colaboradores
Então você decidiu se tornar um colaborador do nosso projeto. Excelente!
Estamos sempre em busca de novos desenvolvedores, então se você é novo, confira nosso guia de primeiros passos.
Mas antes de começarmos a aceitar seu código, há algumas coisas que você deve saber sobre como trabalhamos.

Este documento contém principalmente diretrizes e regras sobre como seu código deve ser estruturado e como ele pode ser confirmado sem incomodar nenhum colega colaborador.


# Qual branch devo usar?
Como um novo contribuidor em potencial, você precisará fazer um fork em nosso repositório e fazer commits em seu próprio “branch”. Então você pode nos enviar uma solicitação pull.

Nosso branch MAIN é o principal branch de desenvolvimento que contém o código mais recente e de última geração.

Nossos outros ramos contêm pesquisas inovadoras, ideias radicais e outras mudanças em andamento que devem ser incorporadas ao MAIN posteriormente.

Se você é um colaborador, a escolha é sua: enviar ramificações para este repositório ou para seu próprio fork.

As ramificações são “atualizadas” e não devem ser “pessoais” para cada usuário. Isso significa que uma ramificação deve ser criada para um novo recurso, não para um playground específico do usuário.


# O que programar
Geralmente, tente enviar solicitações pull que resolvam os problemas existentes.
Se você está procurando algo em que trabalhar, dê uma olhada no rótulo “boa primeira edição” ou em nossos macros.

Claro, se você estiver interessado em outra coisa, sinta-se à vontade para experimentar e enviar. Mas discutir o recurso com antecedência, em um problema, aumentará a probabilidade de sua solicitação pull ser mesclada em tempo hábil.


# "Commitando" código
Certifique-se de que suas contribuições de código sigam o Guia de estilo.

Os commits devem ser testados quando adicionados ao master. Commits que 'precisam ser corrigidos mais tarde' e que afetam diretamente o estado do sistema serão revertidos, exceto em circunstâncias excepcionais.

**As mensagens de commit devem**

- Ser consistente
- Sempre dê uma indicação clara do que foi alterado sem ter que olhar o código
- Inclua números de problemas, usando palavras-chave do GitHub quando necessário
- Siga as sete regras identificadas aqui
- A mais importante das sete regras foi copiada abaixo, mas leia o artigo:
- Use sempre inglês para facilitar o trabalho do colega colaborador.

Separe o assunto do corpo com uma linha em branco
- Limite a linha de assunto a cerca de 60-80 caracteres
- Use o modo imperativo na linha de assunto
- Use o corpo para explicar o que e por que versus como
- Os commits de acompanhamento (adendo) devem referir-se ao commit anterior. Faça isso incluindo o identificador de commit anterior SHA e, se houver - Espaço, uma mensagem de commit resumida na nova mensagem de commit. Fazer isso ajudará a identificar commits relacionados se eles forem visualizados posteriormente.

Tente manter as solicitações pull pequenas - elas devem tratar de uma coisa. Quando você faz várias coisas em uma solicitação pull, é difícil revisar. Se você estiver consertando coisas à medida que avança, convém fazer commits atômicos e, em seguida, selecionar esses commits em ramificações separadas, deixando a solicitação pull limpa.


**Exemplos.** Aqui estão alguns exemplos de mensagens de commit com um título curto e descritivo no modo imperativo.
```
Fix database connection at @services/prisma/connection.ts

Fixed 2 connection problems:
- Disconect after some random connectio
- Disconnect after random user send a information
```

Aqui temos uma descrição mais longa que explica como usar o recurso. O corpo tem 60 caracteres.
```
Add "in-memory-database" of "Player Playground"

Some vite tests were missing during yarn test, this was caused by missing in-memory database
from PlayerPlayground.ts
```

Aqui dizemos Correção nº 1115 para que o GitHub feche automaticamente o problema nº 1115. Não há descrição.
```
Fix #1115: add async encode/decodeString
```

Não houve nenhum problema específico sendo corrigido aqui, mas o recurso squash-merge do GitHub foi anexado automaticamente (#1177), informando qual pull request criou esse commit. Não há descrição.
```
Add "remember this option" checkbox to UserPlayground (#1177)
```

Aqui nos referimos a um commit anterior.
```
Addendum to a80f8d6: fix Connection handler
```

# Revisão código
Os contribuidores devem tentar revisar os commits de outros contribuidores e fornecer feedback tanto quanto possível.

**Ganhar e perder direitos de mesclagem**
Os direitos de mesclagem permitem mesclar suas próprias solicitações pull aprovadas e revisar as solicitações pull de outras pessoas.

Concedemos direitos de mesclagem depois que você provar que é competente, o que geralmente ocorre após 3 a 5 solicitações pull. Isto não é fixo e depende da extensão das suas contribuições, do status da comunidade e de outros fatores.

O assunto de suas solicitações pull não importa — estamos mais interessados em, uma vez concedidos os direitos de mesclagem, se você é capaz de manter um alto padrão de código e permanecer coeso com outros colaboradores do projeto.

Depois de obter direitos de mesclagem, se suas contribuições forem de padrão consistentemente baixo ou se você não seguir as regras, suas permissões serão revogadas.

# Merging pull requests
Antes da merge, imposta pela proteção de ramificação do GitHub, as solicitações pull exigem:

- Se a solicitação pull for grande, tente mesclar apenas se houver pelo menos 2 revisões de solicitação pull. Isso não é aplicado por meio de proteção de filial, mas tente seguir esta convenção (... a menos que ninguém mais esteja revisando seu PR).

- A proteção de branch não é aplicada aos administradores de repositório e, portanto, essas pessoas não são obrigadas a enviar solicitações pull. Os administradores individuais do repositório podem, para um bem maior, comprometer-se a enviar solicitações pull, apesar da falta de aplicação.

- Para fins informativos, os administradores atuais do repositório são aqueles marcados como membros no Github Teams.

Geralmente use o botão "Squash and merge". Se vários commits forem necessários porque você acha que ter commits separados é útil, use "Rebase and merge".



Este artigo foi baseado em: [MTA CONTRIBUTING.md](https://github.com/multitheftauto/mtasa-blue/blob/master/CONTRIBUTING.md)
