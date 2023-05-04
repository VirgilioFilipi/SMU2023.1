# SMU 2023.1

Projeto aos moldes do [semestre 2011.1](https://github.com/boidacarapreta/smu20211/milestones?direction=asc&sort=due_date&state=closed).
## Especificar protocolo de sinalização do jogo #10

```mermaid
stateDiagram-v2
    [*] --> Iniciar
    Iniciar --> Estabelecer_canal
    Estabelecer_canal --> Registro
    state if_registro <<choice>>
    Registro -->  if_registro : registro
    if_registro --> Não_registrado: registro negado
    if_registro --> Registrado: registro aceito
    Não_registrado --> [*]
    Registrado --> Entrar_sala 
    Entrar_sala --> [*] : entrou na sala
```
