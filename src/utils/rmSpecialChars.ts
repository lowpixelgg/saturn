export default function removeSpecialCharacters(str: string) {
  // Cria uma expressão regular que corresponde a todos os caracteres que não são letras, números ou espaços em branco
  const regex = /[^a-zA-Z0-9\s]/g
  // Substitui todos os caracteres que correspondem à expressão regular por uma string vazia
  return str.replace(regex, '')
}
