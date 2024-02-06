<?php
require_once 'config.php';

//PEGANDO OS DADOS VINDOS DO FORMULÁRIO
$email = $_POST['email'];
$data_atual = date('d/m/Y'); 
$hora_atual = date('H:i:s'); 

//PREPARAR COMANDO PARA TABELA
$smtp = $conn->prepare("INSERT INTO newsletter (email, data, hora) VALUES (?,?,?)");
$smtp->bind_param("sss",$email, $data_atual, $hora_atual);

//SE EXECUTAR CORRETAMENTE
if($smtp->execute()){
    echo "E-mail cadastrado com sucesso!";
}else{
    echo "Erro no envio da mensagem: ".$smtp->error;
}

$smtp->close();
$conn->close();

?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Newsletter</title>
    <style>
        /* Estilize o botão como desejar */
        .botao-retorno {
            display: inline-block;
            padding: 10px 20px; /* Espaçamento interno */
            background-color: #007bff; /* Cor de fundo */
            color: #fff; /* Cor do texto */
            text-decoration: none; /* Remova o sublinhado do link */
            border: none; /* Remova a borda */
            border-radius: 5px; /* Borda arredondada */
            cursor: pointer; /* Cursor de mão */
        }

        /* Estilize o botão quando o cursor estiver sobre ele */
        .botao-retorno:hover {
            background-color: #0056b3;
        }


        /* Estilize o botão como desejar */
        .pdf {
            display: inline-block;
            padding: 20px 35px; /* Espaçamento interno */
            background-color: #007bff; /* Cor de fundo */
            color: #fff; /* Cor do texto */
            text-decoration: none; /* Remova o sublinhado do link */
            border: none; /* Remova a borda */
            border-radius: 5px; /* Borda arredondada */
            cursor: pointer; /* Cursor de mão */

            /* Centralize o botão */
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);

            /* Ajuste o tamanho da fonte */
            font-size: 30px; /* Ajuste o valor conforme necessário */

            /* Centralize o texto dentro do botão */
            text-align: center;
        }

        /* Estilize o botão quando o cursor estiver sobre ele */
        .pdf:hover {
            background-color: #0056b3;
        }



    </style>
</head>
<body>
    <a href="https://www.welcometosantos.com.br/" class="botao-retorno">Voltar</a>
    <a href="https://drive.usercontent.google.com/u/0/uc?id=14LrAjqLm6tyvEnvHig2Awjf292qcLZ5Z&export=download" class="pdf">Download GRATUITO do Guia de Bares e Restaurantes</a>
</body>
</html>





