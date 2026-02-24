'use strict';

/**
 * Validação de CPF — algoritmo mod-11
 * Usado no checkout para validar CPF antes do envio
 */
function validarCPF(cpf) {
    var cleaned = cpf.replace(/\D/g, '');
    if (cleaned.length !== 11) return false;

    // Rejeitar sequências repetidas
    if (/^(\d)\1{10}$/.test(cleaned)) return false;

    // Primeiro dígito verificador
    var soma = 0;
    for (var i = 0; i < 9; i++) {
        soma += parseInt(cleaned[i]) * (10 - i);
    }
    var resto = (soma * 10) % 11;
    if (resto === 10) resto = 0;
    if (resto !== parseInt(cleaned[9])) return false;

    // Segundo dígito verificador
    soma = 0;
    for (var i = 0; i < 10; i++) {
        soma += parseInt(cleaned[i]) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10) resto = 0;
    if (resto !== parseInt(cleaned[10])) return false;

    return true;
}

/**
 * Validação de CNPJ — algoritmo mod-11
 */
function validarCNPJ(cnpj) {
    var cleaned = cnpj.replace(/\D/g, '');
    if (cleaned.length !== 14) return false;
    if (/^(\d)\1{13}$/.test(cleaned)) return false;

    var calc = function(str, weights) {
        var soma = 0;
        for (var i = 0; i < weights.length; i++) soma += parseInt(str[i]) * weights[i];
        var resto = soma % 11;
        return resto < 2 ? 0 : 11 - resto;
    };

    var d1 = calc(cleaned, [5,4,3,2,9,8,7,6,5,4,3,2]);
    if (d1 !== parseInt(cleaned[12])) return false;

    var d2 = calc(cleaned, [6,5,4,3,2,9,8,7,6,5,4,3,2]);
    return d2 === parseInt(cleaned[13]);
}

/**
 * Valida CPF ou CNPJ dependendo do tamanho
 */
function validarCPFouCNPJ(valor) {
    var cleaned = valor.replace(/\D/g, '');
    if (cleaned.length <= 11) return validarCPF(valor);
    return validarCNPJ(valor);
}

/**
 * Máscara de CPF: 000.000.000-00
 */
function mascaraCPF(input) {
    var value = input.value.replace(/\D/g, '');
    if (value.length > 11) value = value.substring(0, 11);

    if (value.length > 9) {
        input.value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
    } else if (value.length > 6) {
        input.value = value.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
    } else if (value.length > 3) {
        input.value = value.replace(/(\d{3})(\d{1,3})/, '$1.$2');
    } else {
        input.value = value;
    }
}

/**
 * Máscara CPF/CNPJ dinâmica: detecta pelo número de dígitos digitados
 * CPF:  000.000.000-00  (11 dígitos)
 * CNPJ: 00.000.000/0000-00 (14 dígitos)
 */
function mascaraCPFouCNPJ(input) {
    var value = input.value.replace(/\D/g, '');
    if (value.length > 14) value = value.substring(0, 14);

    if (value.length > 11) {
        // CNPJ: 00.000.000/0000-00
        if (value.length > 12) {
            input.value = value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{1,2})/, '$1.$2.$3/$4-$5');
        } else {
            input.value = value.replace(/(\d{2})(\d{3})(\d{3})(\d{1,4})/, '$1.$2.$3/$4');
        }
    } else {
        // CPF: 000.000.000-00
        if (value.length > 9) {
            input.value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
        } else if (value.length > 6) {
            input.value = value.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
        } else if (value.length > 3) {
            input.value = value.replace(/(\d{3})(\d{1,3})/, '$1.$2');
        } else {
            input.value = value;
        }
    }
}

/**
 * Máscara de telefone: (00) 00000-0000
 */
function mascaraTelefone(input) {
    var value = input.value.replace(/\D/g, '');
    if (value.length > 11) value = value.substring(0, 11);

    if (value.length > 6) {
        input.value = value.replace(/(\d{2})(\d{5})(\d{1,4})/, '($1) $2-$3');
    } else if (value.length > 2) {
        input.value = value.replace(/(\d{2})(\d{1,5})/, '($1) $2');
    } else if (value.length > 0) {
        input.value = value.replace(/(\d{1,2})/, '($1');
    }
}
