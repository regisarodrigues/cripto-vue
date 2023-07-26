<script setup>
defineProps({
  cotacao: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <div class="contenedor-resultado">
    <h2>Cotação</h2>
    <div class="resultado">
      <img :src="'https://cryptocompare.com/' + cotacao.IMAGEURL" alt="imagem criptomoeda" />
      <div>
        <p>
          Preço: <span>{{ cotacao.PRICE }}</span>
        </p>
        <p>
          Preço mais alto do dia: <span>{{ cotacao.HIGHDAY }}</span>
        </p>
        <p>
          Preço mais baixo do dia: <span>{{ cotacao.LOWDAY }}</span>
        </p>
        <p>
          Variação últimas 24 horas: <span>{{ cotacao.CHANGEPCT24HOUR }}%</span>
        </p>
        <p>
          Última atualização: <span>{{ cotacao.LASTUPDATE }}</span>
        </p>
      </div>
    </div>
  </div>
</template>
