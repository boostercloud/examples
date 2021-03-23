export const getInitials = (name: string) => {
  return name.split(' ').reduce((acc, currentValue) => acc + currentValue.charAt(0), '').toUpperCase();
};

export const colors = ['#EE79A5', '#AFCD97', '#F3A864', '#5A7CF5', '#6950F1'];
