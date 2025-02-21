// Array para armazenar as informações dos alunos
const presencas = [];

document.getElementById('confirmar-presenca').addEventListener('click', function() {
    const ra = document.getElementById('ra').value;
    const codigo = document.getElementById('codigo').value;

    // Verifica se ambos os campos foram preenchidos
    if (ra && codigo) {
        // Adiciona as informações ao array de presenças
        presencas.push({ ra, codigo });

        // Exibe uma mensagem de confirmação
        alert(`Presença confirmada para RA: ${ra}`);

        // Limpa os campos de entrada
        document.getElementById('ra').value = '';
        document.getElementById('codigo').value = '';
    } else {
        alert('Por favor, preencha todos os campos.');
    }
});
//pdf
document.getElementById('gerar-pdf').addEventListener('click', function() {
    const { jsPDF } = window.jspdf;

    const professor = document.getElementById('professor').value;
    const disciplina = document.getElementById('disciplina').value;

    // Cria um novo documento PDF
    const doc = new jsPDF();

    // Título e informações do professor/disciplina
    doc.setFontSize(16);
    doc.text("Lista de Presença", 105, 20, null, null, 'center');
    doc.setFontSize(12);
    doc.text(`Professor: ${professor}`, 20, 30);
    doc.text(`Disciplina: ${disciplina}`, 20, 40);
    doc.text(`Data: ${new Date().toLocaleDateString('pt-BR')}`, 20, 50);

    // Desenha a linha horizontal
    doc.line(20, 55, 190, 55);

    // Cabeçalhos da tabela
    doc.setFontSize(12);
    doc.text("Nº", 20, 65);
    doc.text("Matrícula (RA)", 40, 65);
    doc.text("Código de Presença", 120, 65);

    // Adiciona a lista de presenças
    let yPosition = 75;
    presencas.forEach((presenca, index) => {
        doc.text(`${index + 1}`, 20, yPosition);
        doc.text(presenca.ra, 40, yPosition);
        doc.text(presenca.codigo, 120, yPosition);
        yPosition += 10;

        // Verifica se precisa criar uma nova página
        if (yPosition > 280) {
            doc.addPage();
            yPosition = 20;
        }
    });

    // Salva o PDF
    doc.save('lista_presenca.pdf');
});
// Configuração do Firebase "Modificação"
const firebaseConfig = {
    apiKey: "AIzaSyBQBss-1WbT3B3baV4DNuZBU1czHB4iO3A",
    authDomain: "database-a34d2.firebaseapp.com",
    databaseURL: "https://database-a34d2-default-rtdb.firebaseio.com",
    projectId: "database-a34d2",
    storageBucket: "database-a34d2.appspot.com",
    messagingSenderId: "422039753936",
    appId: "1:422039753936:web:e193a8f7e78f61b743bad5"
  };
  // Inicializa o Firebase
  firebase.initializeApp(firebaseConfig);
  const database = firebase.database();

  // Referência para o array de presenças
  const presencasRef = database.ref('presencas');

  // Escuta atualizações do Firebase em tempo real
  presencasRef.on('value', (snapshot) => {
    const data = snapshot.val();
    console.log('Presenças atualizadas:', data);
    // Aqui você pode atualizar a UI com as presenças
  });

  // Função para adicionar presença
  function adicionarPresenca(ra, codigo) {
    const novaPresenca = { ra, codigo };
    presencasRef.push(novaPresenca);
  }
//end mofigication

function updateDateTime() {
    const now = new Date();
    const formattedDate = now.toLocaleDateString('pt-BR');
    const formattedTime = now.toLocaleTimeString('pt-BR');
    document.getElementById('datetime').innerText = `${formattedDate} ${formattedTime}`;
}

setInterval(updateDateTime, 1000);
