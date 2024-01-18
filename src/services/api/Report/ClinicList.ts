import JsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import moment from 'moment';
// import saveAs from 'file-saver';
import { useSystemUtils } from 'src/composables/shared/systemUtils/systemUtils';

const { isMobile } = useSystemUtils();

const reportName = 'ClinicsList';
// const logoTitle =
// 'REPÚBLICA DE MOÇAMBIQUE \n MINISTÉRIO DA SAÚDE \n SERVIÇO NACIONAL DE SAÚDE'
const title =
  'Lista de Unidade Sanitarias que realizam a Circuncisão Masculina ';
const fileName = reportName.concat(
  '_' + moment(new Date()).format('DD-MM-YYYY')
);

export default {
  async downloadPDF(province: any, district: any, result: []) {
    const doc = new JsPDF({
      orientation: 'l',
      unit: 'mm',
      format: 'a4',
      putOnlyUsedFonts: true,
      floatPrecision: 'smart', // or "smart", default is 16
    });
    // const totalPagesExp = '{total_pages_count_string}'
    /*
      Fill Table
    */

    const desiredDefinition = [
      [
        {
          content:
            ' Lista de Unidade Sanitarias que realizam a Circuncisão Masculina',
          colSpan: 3,
          halign: 'center',
          valign: 'middle',
          fontStyle: 'bold',
          fontSize: '14',
        },
      ],
      [
        {
          content: 'Província: ' + province.description,
          halign: 'center',
          valign: 'middle',
          fontStyle: 'bold',
          fontSize: '14',
        },
        {
          content: 'Distrito: ' + district.description,
          halign: 'center',
          valign: 'left',
          fontStyle: 'bold',
          fontSize: '14',
        },
      ],
    ];

    const cols = ['Nome', 'Tipo'];

    const rows = result;
    const data = [];
    let ord = 1;

    for (const row in rows) {
      const createRow = [];
      createRow.push(rows[row].name);
      createRow.push(rows[row].type);
      data.push(createRow);
      ord += 1;
    }
    ord = 0;
    autoTable(doc, {
      margin: { top: 42 },
      bodyStyles: {
        halign: 'center',
      },
      headStyles: {
        halign: 'center',
        valign: 'middle',
      },
      didDrawPage: function (data) {
        // First Hearder
        autoTable(doc, {
          margin: { top: 20 },
          bodyStyles: {
            halign: 'left',
            valign: 'middle',
          },
          headStyles: {
            halign: 'center',
            valign: 'middle',
          },
          theme: 'grid',
          body: desiredDefinition,
        });

        // Footer
        const str = 'Pagina ' + doc.internal.getNumberOfPages();
        // Total page number plugin only available in jspdf v1.0+
        // if (typeof doc.putTotalPages === 'function') {
        //   str = str + ' de ' + totalPagesExp
        // }
        doc.setFontSize(10);

        // jsPDF 1.4+ uses getWidth, <1.4 uses .width
        const pageSize = doc.internal.pageSize;
        const pageHeight = pageSize.height
          ? pageSize.height
          : pageSize.getHeight();
        doc.text(str, data.settings.margin.left, pageHeight - 10);
      },
      // startY: doc.lastAutoTable.finalY,
      theme: 'grid',
      head: [cols],
      body: data,
    });
    if (!isMobile.value) {
      return doc.save('Lista de Unidades Sanitarias.pdf');
    } else {
      console.log(doc);
      const pdfOutput = doc.output();
      console.log(pdfOutput);
      //  this.downloadFile(fileName, 'pdf', pdfOutput);
    }
    // params.value.loading.loading.hide()
    // return doc.save('HistoricoDeLevantamento.pdf')
  },
};
