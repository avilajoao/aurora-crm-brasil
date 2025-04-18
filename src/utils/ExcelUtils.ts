
import * as XLSX from 'xlsx';

export function exportToExcel(data: any[], filename: string) {
  // Criar uma nova planilha
  const worksheet = XLSX.utils.json_to_sheet(data);
  
  // Criar um livro
  const workbook = XLSX.utils.book_new();
  
  // Adicionar a planilha ao livro
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Dados');
  
  // Gerar o arquivo e iniciar o download
  XLSX.writeFile(workbook, `${filename}.xlsx`);
}

export function formatDateForExport(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleDateString('pt-BR');
}
