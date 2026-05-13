let carrinho = JSON.parse(localStorage.getItem("carrinho")) || {};
let kitSelecionados = [];
let kitTamanho = 0;

const produtos = [
  {nome:"Trufa sabor Ninho no chocolate branco", img:"Ninho_branco.jpg", preco:9},
  {nome:"Trufa sabor Ninho no chocolate preto", img:"Ninho_preto.jpg", preco:9},

  {nome:"Abacaxi no chocolate branco", img:"Abacaxi_branco.jpg", preco:9},
  {nome:"Abacaxi no chocolate preto", img:"Abacaxi_preto.jpg", preco:9},

  {nome:"Maracujá no chocolate preto", img:"Maracuja_preto.jpg", preco:9},
  {nome:"Maracujá no chocolate branco", img:"Maracuja_branco.jpg", preco:9},

  {nome:"Limão no chocolate branco", img:"Limao_branco.jpg", preco:9},
  {nome:"Limão no chocolate preto", img:"Limao_preto.jpg", preco:9},

  {nome:"Trufa sabor prestigio no chocolate preto", img:"Prestigio_preto.jpg", preco:9},
  {nome:"Trufa sabor prestigio no chocolate branco", img:"Prestigio_branco.jpg", preco:9},

  {nome:"Tradicional no chocolate branco", img:"Tradicional_branco.jpg", preco:9},
  {nome:"Tradicional no chocolate preto", img:"Tradicional_preto.jpg", preco:9},

  {nome:"Brigadeiro no chocolate branco", img:"Brigadeiro_branco.jpg", preco:9},
  {nome:"Brigadeiro no chocolate preto", img:"Brigadeiro_preto.jpg", preco:9},

  {nome:"Trufa sabor Sensação no chocolate preto", img:"Sensacao_preto.jpg", preco:9},
  {nome:"Trufa sabor Sensação no chocolate branco", img:"Sensacao_branco.jpg", preco:9},

  {nome:"Manga no chocolate preto", img:"Manga_preto.jpg", preco:9},
  {nome:"Manga no chocolate branco", img:"Manga_branco.jpg", preco:9},

  {nome:"Beijinho no chocolate preto", img:"Beijinho_preto.jpg", preco:9},
  {nome:"Beijinho no chocolate branco", img:"Beijinho_branco.jpg", preco:9},

  {nome:"Trufa sabor Nutella no chocolate branco", img:"Nutella_branco.jpg", preco:10},
  {nome:"Trufa sabor Nutella no chocolate preto", img:"Nutella_preto.jpg", preco:10},

  {nome:"Trufa sabor ninho com nutella no chocolate preto", img:"Ninu_preto.jpg", preco:10},
  {nome:"Trufa sabor ninho com nutella no chocolate branco", img:"Ninu_branco.jpg", preco:10},

  {nome:"Maracujá com doce de leite no chocolate preto", img:"Mdl_preto.jpg", preco:10},
  {nome:"Maracujá com doce de leite no chocolate branco", img:"Mdl_branco.jpg", preco:10},

  {nome:"Trufa sabor Charge no chocolate branco", img:"Charge_branco.jpg", preco:10},
  {nome:"Trufa sabor Charge  no chocolate preto", img:"Charge_preto.jpg", preco:10},

  {nome:"Trufa sabor Oreo no chocolate preto", img:"Oreo_preto.jpg", preco:10},
  {nome:"Trufa sabor Oreo no chocolate branco", img:"Oreo_branco.jpg", preco:10},

  {nome:"Pistache no chocolate branco", img:"Pistache_branco.jpg", preco:10},
  {nome:"Pistache no chocolate preto", img:"Pistache_preto.jpg", preco:10},

  {nome:"Paçoca no chocolate preto", img:"Pacoca_preto.jpg", preco:10},
  {nome:"Paçoca no chocolate branco", img:"Pacoca_branco.jpg", preco:10},

  {nome:"Floresta Negra no chocolate preto", img:"Florestanegra_preto.jpg", preco:10},
  {nome:"Floresta Negra no chocolate branco", img:"Florestanegra_branco.jpg", preco:10},

  {nome:"Cereja no chocolate branco", img:"Cereja_branco.jpg", preco:10},
  {nome:"Cereja no chocolate preto", img:"Cereja_preto.jpg", preco:10},

  {nome:"Trufa sabor Maracuja com nutella no chocolate preto", img:"Manu_preto.jpg", preco:10},
  {nome:"Trufa sabor Maracuja com nutella no chocolate branco", img:"Manu_branco.jpg", preco:10},

  {nome:"Banoffe no chocolate preto", img:"Banoff_preto.jpg", preco:10},
  {nome:"Banoffe no chocolate branco", img:"Banoff_branco.jpg", preco:10},

  {nome:"Algodão doce no chocolate preto", img:"Algodao_preto.jpg", preco:10},
  {nome:"Algodão doce no chocolate branco", img:"Algodao_branco.jpg", preco:10},

  {nome:"café no chocolate preto", img:"Cafe_preto.jpg", preco:10},
  {nome:"café no chocolate branco", img:"Cafe_branco.jpg", preco:10}
];

/* RENDER */
function render(){
  const grid = document.getElementById("produtos");
  grid.innerHTML = "";

  produtos.forEach((p,i)=>{
    grid.innerHTML += `
      <div class="card">
        <img src="Produtos/${p.img}">
        <h4>${p.nome}</h4>
        <p>R$ ${p.preco}</p>
        <button onclick="add(${i})">+</button>
      </div>
    `;
  });
}

/* ADD */
function add(i){
  const p = produtos[i];

  if(!carrinho[p.nome]){
    carrinho[p.nome] = {qtd:0, preco:p.preco};
  }

  carrinho[p.nome].qtd++;
  salvar();
  atualizarCarrinho();

  const btn = document.getElementById("btnCarrinho");
  btn.classList.add("pulse");

  setTimeout(()=>btn.classList.remove("pulse"),400);
}

/* CARRINHO */
function salvar(){
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

function mais(i){
  carrinho[i].qtd++;
  atualizarCarrinho();
}

function menos(i){
  carrinho[i].qtd--;

  if(carrinho[i].qtd <= 0){
    delete carrinho[i];
  }

  atualizarCarrinho();
}

function atualizarCarrinho(){
  let lista = document.getElementById("listaCarrinho");
  let total = 0;

  lista.innerHTML = "";

  for(let nome in carrinho){
    let item = carrinho[nome];

    total += item.preco * item.qtd;

    lista.innerHTML += `
      <div style="margin-bottom:10px; border-bottom:1px solid #ddd;">
        <strong>${item.nome || nome}</strong><br>

        ${item.sabores ? `<small>${item.sabores.join(", ")}</small><br>` : ""}

        <button onclick="menos('${nome}')">-</button>
        ${item.qtd}
        <button onclick="mais('${nome}')">+</button>

        <br>R$ ${(item.preco * item.qtd).toFixed(2)}
      </div>
    `;
  }

  document.getElementById("total").innerText = "Total: R$ " + total.toFixed(2);
 let qtdTotal = 0;

for(let nome in carrinho){
  qtdTotal += carrinho[nome].qtd;
}

document.getElementById("contador").innerText = qtdTotal;

document.getElementById("valorTopo").innerText =
  "R$ " + total.toFixed(2);
}

function toggleCarrinho(){
  document.getElementById("carrinho").classList.toggle("aberto");
}

function limparCarrinho(){
  carrinho = {};
  salvar();
  atualizarCarrinho();
}

/* KIT */
let kitAtual = 0;
let selecionados = [];

function abrirKit(q){
  kitAtual = q;
  selecionados = [];

  document.getElementById("modalKit").classList.add("ativo");
  renderKit();
}

/* 🔥 AQUI FOI AJUSTADO */
function renderKit(){
  const el = document.getElementById("kitSabores");
  el.innerHTML = "";

  produtos.forEach((p,i)=>{

    let qtd = selecionados.filter(x => x === i).length;

    el.innerHTML += `
      <div class="saborBtn">
        <span>${p.nome}</span>

        <div style="display:flex;align-items:center;gap:5px;">
          <button onclick="remSabor(${i})">-</button>
          ${qtd > 0 ? `<strong>${qtd}</strong>` : ""}
          <button onclick="addSabor(${i})">+</button>
        </div>
      </div>
    `;
  });

  atualizarKit();
}

function addSabor(i){
  if(selecionados.length < kitAtual){
    selecionados.push(i);
    atualizarKit();
  }
}

function remSabor(i){
  const idx = selecionados.indexOf(i);
  if(idx > -1){
    selecionados.splice(idx,1);
    atualizarKit();
  }
}

function atualizarKit(){
  const cont = document.getElementById("kitContador");
  const res = document.getElementById("kitResumo");

  cont.innerText = `${selecionados.length}/${kitAtual}`;

  let total = 0;
  res.innerHTML = "";

  selecionados.forEach(i=>{
    const p = produtos[i];
    total += p.preco;
    res.innerHTML += `<div>${p.nome}</div>`;
  });

  let desconto = kitAtual === 3 ? 3 : kitAtual === 5 ? 5 : kitAtual === 10 ? 10 : 0;

  res.innerHTML += `<hr>Total: R$ ${total - desconto}`;
}

function confirmarKit(){

  if(selecionados.length !== kitAtual){
    alert("Escolha exatamente " + kitAtual + " sabores");
    return;
  }

  let nomes = [];
  let precoBase = 0;

  selecionados.forEach(i=>{
    let p = produtos[i];
    nomes.push(p.nome);
    precoBase += p.preco;
  });

  let desconto = kitAtual === 3 ? 3 :
                 kitAtual === 5 ? 5 :
                 kitAtual === 10 ? 10 : 0;

  let precoFinal = precoBase - desconto;

  let idKit = `kit_${Date.now()}`;

  carrinho[idKit] = {
    nome: `Kit (${kitAtual})`,
    sabores: nomes,
    preco: precoFinal,
    qtd: 1
  };

  salvar();
  atualizarCarrinho();
  fecharKit();
}

function fecharKit(){
  document.getElementById("modalKit").classList.remove("ativo");
}

function finalizar(){

  if(!carrinho || Object.keys(carrinho).length === 0){
    alert("Seu carrinho está vazio!");
    return;
  }

  let nomeCliente = "";
  let endereco = "";

  while(!nomeCliente || nomeCliente.trim() === ""){
    nomeCliente = prompt("Digite seu nome:");

    if(nomeCliente === null) return;
  }

  while(!endereco || endereco.trim() === ""){
    endereco = prompt("Digite o endereço de entrega:");

    if(endereco === null) return;
  }

  let msg = ` *Pedido - Trufas da LUH*\n\n`;

  let total = 0;

  for(let nome in carrinho){

    let item = carrinho[nome];
    let subtotal = item.qtd * item.preco;

    total += subtotal;

    msg += ` ${nome}\n`;

    // MOSTRA SABORES DOS KITS
    if(item.sabores){
      msg += `Sabores: ${item.sabores.join(", ")}\n`;
    }

    msg += `Qtd: ${item.qtd}\n`;
    msg += `Subtotal: R$ ${subtotal.toFixed(2)}\n\n`;
  }

  msg += ` Total: R$ ${total.toFixed(2)}\n\n`;
  msg += ` Nome: ${nomeCliente}\n`;
  msg += ` Endereço: ${endereco}`;

  // 🔥 ISSO CORRIGE OS EMOJIS
  let url = `https://wa.me/5514991271563?text=${encodeURIComponent(msg)}`;

  window.open(url, "_blank");

  carrinho = {};
  salvar();
  atualizarCarrinho();
}

render();
atualizarCarrinho();
