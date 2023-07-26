import { computed, onMounted, ref } from 'vue';
export default function useCripto() {
  const criptomoedas = ref([]);
  const cotacao = ref({});
  const caregando = ref(false);

  const monedas = ref([
    { codigo: 'USD', texto: 'Dolar Estados Unidos' },
    { codigo: 'BRL', texto: 'Real Brasileiro' },
    { codigo: 'MXN', texto: 'Peso Mexicano' },
    { codigo: 'EUR', texto: 'Euro' },
    { codigo: 'GBP', texto: 'Libra Esterlina' }
  ]);

  onMounted(() => {
    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=BRL';

    fetch(url)
      .then((resp) => resp.json())
      .then(({ Data }) => (criptomoedas.value = Data));
  });

  const obterCotacao = async (cotar) => {
    caregando.value = true;
    cotacao.value = {};
    try {
      const { moeda, criptomoeda } = cotar;
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoeda}&tsyms=${moeda}`;

      const resp = await fetch(url);
      const data = await resp.json();

      cotacao.value = data.DISPLAY[criptomoeda][moeda];
    } catch (error) {
      console.log(error);
    } finally {
      caregando.value = false;
    }
  };

  const mostrarResultado = computed(() => {
    return Object.values(cotacao.value).length > 0;
  });

  return { monedas, criptomoedas, caregando, cotacao, obterCotacao, mostrarResultado };
}
