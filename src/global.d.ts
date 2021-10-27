/// <reference types="@sveltejs/kit" />

type player = {
      name: string;
      role: 'top' | 'jngl' | 'mid' | 'adc' | 'supp',
      champ: string | null,
      status: '' | 'hover' | 'locked'
};