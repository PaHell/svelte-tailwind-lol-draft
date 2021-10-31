/// <reference types="@sveltejs/kit" />

type player = {
      name: string;
      role: 'top' | 'jngl' | 'mid' | 'adc' | 'supp',
      champ: string | null,
      status: '' | 'hover' | 'locked'
};

type team = {
      short: string,
      name: string,
      score: number,
      score: string
}