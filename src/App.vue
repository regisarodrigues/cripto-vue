<script setup>
import AlertaComponent from '@/components/AlertaComponent.vue';
import SpinerComponent from '@/components/SpinerComponent.vue';
import { reactive, ref } from 'vue';
import CotacaoComponent from './components/CotacaoComponent.vue';
import useCripto from './composables/useCripto.js';
const { monedas, criptomoedas, cotacao, obterCotacao, mostrarResultado } = useCripto();

const cotar = reactive({
  moeda: '',
  criptomoeda: ''
});
const error = ref('');

const cotarCripto = () => {
  // validar campos nao sejam vazios
  if (Object.values(cotar).includes('')) {
    error.value = 'Todos os campos são obrigatórios.';
    return;
  }
  error.value = '';
  obterCotacao(cotar);
};
</script>

<template>
  <div class="contenedor">
    <h1 class="titulo">Cotação de <span>Criptomoedas</span></h1>
    <div class="contenido">
      <AlertaComponent v-if="error">{{ error }} </AlertaComponent>
      <form class="formulario" @submit.prevent="cotarCripto">
        <div class="campo">
          <label for="moneda">Moeda:</label>
          <select id="moneda" v-model="cotar.moeda">
            <option value="">-- Moeda --</option>
            <option v-for="moeda in monedas" :key="moeda.codigo" :value="moeda.codigo">
              {{ moeda.texto }}
            </option>
          </select>
        </div>

        <div class="campo">
          <label for="cripto">Criptomoeda:</label>
          <select id="cripto" v-model="cotar.criptomoeda">
            <option value="">-- Criptomoeda --</option>
            <option
              v-for="criptom in criptomoedas"
              :key="criptom.CoinInfo.Id"
              :value="criptom.CoinInfo.Name"
            >
              {{ criptom.CoinInfo.FullName }}
            </option>
          </select>
        </div>
        <input type="submit" value="Cotar" />
      </form>

      <SpinerComponent v-if="caregando" />

      <CotacaoComponent :cotacao="cotacao" v-if="mostrarResultado" />
    </div>
  </div>
</template>
