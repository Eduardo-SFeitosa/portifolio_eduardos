# Portfólio 3D Interativo

Um portfólio pessoal desenvolvido como uma experiência 3D interativa, onde cada seção do portfólio é representada por uma cena dentro de um pequeno mundo fantástico.

Em vez de navegar por páginas tradicionais, o usuário explora o ambiente e interage com diferentes elementos para descobrir informações sobre minha trajetória, tecnologias, projetos e formas de contato.

O projeto foi desenvolvido principalmente para explorar o uso de **React com Three.js**, combinando interfaces HTML tradicionais com elementos 3D, animações, shaders e sistemas de navegação baseados em câmera.

## Uma demonstração pode ser encontrada aqui:

**Portfólio:** [adicione aqui o link do deploy]

---

## Sobre o projeto

A ideia do projeto surgiu da vontade de transformar meu portfólio em algo que também demonstrasse minhas habilidades de desenvolvimento.

O ambiente funciona como uma pequena jornada dividida em diferentes áreas:

* **Sobre** — apresentação pessoal.
* **Jornada** — linha do tempo da minha formação e experiências.
* **Stacks** — tecnologias e ferramentas que utilizo.
* **Projetos** — trabalhos e jogos desenvolvidos.
* **Contato** — formulário e links profissionais.

Cada área possui uma cena própria e uma interface específica, mas todas fazem parte do mesmo ambiente 3D.

A navegação também foi construída para que o usuário possa tanto explorar o mundo quanto utilizar os controles de navegação para acessar diretamente uma seção.

---

## Principais tecnologias

### Front-end

* React
* JavaScript
* HTML
* SCSS
* Vite

### 3D

* Three.js
* React Three Fiber
* React Three Drei
* GLTF / GLB
* GLSL Shaders

### Animação

* React Spring
* `useFrame`
* animações baseadas em estado
* animações de câmera
* animações procedurais

### Outros recursos

* EmailJS
* React Icons
* Instanced Meshes
* sistemas de partículas
* iluminação dinâmica
* interação por ponteiro
* controles adaptados para desktop e mobile

---

# Principais desafios técnicos

## 1. Navegação 3D baseada em câmera

Um dos principais objetivos do projeto foi fazer com que a navegação não funcionasse como uma simples troca de páginas.

A câmera percorre um caminho através do ambiente e pode ser direcionada para diferentes pontos de interesse.

Para isso, foi criado um sistema centralizado de controle de câmera que gerencia:

* posição da câmera;
* direção do deslocamento;
* progresso do caminho;
* travamento da câmera em uma cena;
* retorno à navegação principal;
* transições entre áreas;
* navegação direta através dos botões da interface.

A aplicação mantém estados como a cena atual, cena em foco, interface ativa e direção da navegação para coordenar esses diferentes sistemas.

Isso permitiu separar a **navegação do mundo 3D** das **interfaces específicas de cada seção**.

---

## 2. Integração entre React e Three.js

O projeto utiliza React Three Fiber para transformar componentes React em elementos dentro da cena Three.js.

Isso permitiu tratar objetos 3D e sistemas de interação como componentes reutilizáveis.

Por exemplo, o componente abaixo pode ser criado facilmente e reutilizado, sendo necessário somente a troca de variaveis:

```jsx
< EstrelaEstatica
  nome="estrelas_1"
  posicao={[ -25, 15, 0 ]}
  largura={10}
  altura={20}
  profundidade={20}
  estrelas={800} />
```

Dessa maneira, o estado da aplicação controla diretamente o comportamento do objeto 3D.

A mesma abordagem foi utilizada para as diferentes áreas do portfólio, permitindo que cada cena tenha sua própria lógica sem precisar concentrar todo o código em um único componente.

---

## 3. Animações de objetos 3D

As transições das cenas utilizam animações baseadas em estado.

Possuindo uma animação que controla simultaneamente sua posição e rotação utilizando `react-spring`.

Quando a cena é ativada, a cena começa a produzir seus efeitos visuais.

Esse fluxo é controlado através de estados e callbacks de animação, permitindo que a interface seja exibida somente depois que a animação relevante termina.

---

## 4. Interfaces HTML sobre uma cena 3D

Apesar de o ambiente ser 3D, as informações e formulários continuam utilizando elementos HTML tradicionais.

Isso permite aproveitar recursos nativos da web para:

* formulários;
* links;
* inputs;
* textos;
* botões;
* acessibilidade básica;
* responsividade.

O projeto utiliza componentes do `@react-three/drei`, como `Html` e `Text`, quando elementos de interface precisam estar conectados com o 3D.

---

# Responsividade

O projeto possui comportamentos diferentes para desktop e dispositivos móveis.

Alguns elementos da experiência são ajustados de acordo com a orientação da tela, incluindo:

* posição da câmera;
* escala de elementos;
* distância da câmera;
* interação por ponteiro;
* comportamento de seleção das cenas.

Um dos desafios foi lidar com a diferença entre **clique e arraste em dispositivos touchscreen**.

No desktop, a interação pode utilizar diretamente eventos de clique, enquanto no mobile o fluxo considera eventos de pressionar e soltar para evitar conflitos com a interação de toque.

---

# Estrutura geral

A aplicação utiliza uma estrutura baseada em cenas e componentes.

Uma visão simplificada da arquitetura é:

```text
App
│
├── Controle de câmera
│
├── Ambiente 3D
│   ├── Modelo base
│   ├── Água animada
│   ├── Sistema de estrelas
│   └── Iluminação
│
├── Cenas interativas
│   ├── Porta
│   ├── Acampamento
│   ├── Orbe
│   ├── Mina
│   └── Bau
│
└── Interfaces
    ├── Sobre
    ├── Jornada
    ├── Stacks
    ├── Projetos
    └── Contato
```

A navegação principal mantém o estado da cena atual e decide qual interface deve ser apresentada.

Cada cena é responsável por sua própria lógica de interação e animação.

---

# Conceitos explorados

Este projeto foi desenvolvido principalmente como uma forma de aprofundar conhecimentos em:

* desenvolvimento front-end com React;
* renderização 3D na Web;
* Three.js;
* React Three Fiber;
* gerenciamento de estado;
* composição de componentes;
* animação;
* shaders GLSL;
* sistemas de partículas;
* instancing;
* manipulação de câmera;
* eventos de ponteiro;
* integração entre WebGL e DOM;
* responsividade;
* otimização de elementos 3D.

Mais do que criar uma interface visualmente diferente, o projeto serviu como um laboratório para experimentar diferentes técnicas de desenvolvimento 3D na web.

---

# Tecnologias

| Tecnologia        | Utilização                                       |
| ----------------- | ------------------------------------------------ |
| React             | Estrutura da aplicação e gerenciamento de estado |
| Vite              | Desenvolvimento e build                          |
| Three.js          | Renderização 3D                                  |
| React Three Fiber | Integração entre React e Three.js                |
| Drei              | Componentes e utilitários para R3F               |
| GLSL              | Shaders e efeitos visuais                        |
| React Spring      | Animações 3D                                     |
| SCSS              | Estilização das interfaces                       |
| EmailJS           | Sistema de contato                               |
| React Icons       | Ícones da interface                              |

---

# Autor

**Eduardo Santos**

Desenvolvedor interessado em desenvolvimento web, desenvolvimento de jogos e experiências interativas.

---

## Licença

Este projeto foi desenvolvido como portfólio pessoal e projeto de estudo.

Os códigos podem ser utilizados como referência para aprendizado, respeitando os direitos dos assets, modelos 3D, imagens e demais recursos de terceiros utilizados no projeto.
