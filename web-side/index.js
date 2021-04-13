let actionContainer = $("#box");
let id = 0

window.addEventListener("message", function (event) {
    let item = event.data;
    id = item.id
    switch (item.action) {
        case "showMenu":
            actionContainer.fadeIn(1000);
            $("#box").css("display", "grid")
            break;

        case "hideMenu":
            actionContainer.fadeOut(1000);
            $("#box").css("display", "none")
            break;
    }
});


$(document).keyup(function(e) {
    if (e.key === "Escape") { // escape key maps to keycode `27`
        $.post("http://nav_conce/dealerClose",JSON.stringify({}),function(datab){});
    }
});


$(document).ready(function () {
    $("#inicio").css("color", "red");
    $.ajax({
        dataType: "json",
        type: "GET",
        url: "http://localhost:5000/testes/allVeh",
        success: function (response) {
            let conteudo = ''

            let resposta = response.data
            $.each(resposta, function (key, value) {
                conteudo +=
                    '<div class="content-items" data-action="' + value.id + '">' +
                    '                <img src="images/' + value.car + '.webp">' +
                    '                <a class="name">' + value.displayname + '</a>' +
                    '                <a class="mala">Porta-malas: ' + value.trunk + 'kg</a>' +
                    '                <a class="preco">Preço: $' + value.price + '</a>\n' +
                    '                <a class="stock">Disponíveis: ' + value.stock + '</a>\n' +
                    '                <button class="button" data="' + value.car + '" data2="' + value.price + '" data3="' + value.stock + '">Comprar</button>' +
                    '            </div>'
            });
            if (conteudo != '') {
                $('#content').html("");
                $('#content').append(conteudo);
            } else {
                $('#content').append(conteudo);
            }
            $('button').click(function () {
                let carro = $(this).attr('data')
                let preco = $(this).attr('data2')
                let stock = $(this).attr('data3')
                $.post("https://nav_conce/buyDealer", JSON.stringify({
                    name: carro,
                    price: preco,
                    stock: stock
                }));
            })
        }
    });
})

if ($('#inicio').click(function () {
    $("#inicio").css("color", "red");
    $("#carros").css("color", "white");
    $("#motos").css("color", "white");
    $("#importados").css("color", "white");
    $("#possuidos").css("color", "white");
    $.ajax({
        dataType: "json",
        type: "GET",
        url: "http://localhost:5000/testes/allVeh",
        success: function (response) {
            let conteudo = ''

            let resposta = response.data
            $.each(resposta, function (key, value) {
                conteudo +=
                    '<div class="content-items" data-action="' + value.id + '">' +
                    '                <img src="images/' + value.car + '.webp">' +
                    '                <a class="name">' + value.displayname + '</a>' +
                    '                <a class="mala">Porta-malas: ' + value.trunk + 'kg</a>' +
                    '                <a class="preco">Preço: $' + value.price + '</a>\n' +
                    '                <a class="stock">Disponíveis: ' + value.stock + '</a>\n' +
                    '                <button class="button" data="' + value.car + '" data2="' + value.price + '" data3="' + value.stock + '">Comprar</button>' +
                    '            </div>'
            });
            if (conteudo != '') {
                $('#content').html("");
                $('#content').append(conteudo);
            } else {
                $('#content').append(conteudo);
            }
            $('button').click(function () {
                let carro = $(this).attr('data')
                let preco = $(this).attr('data2')
                let stock = $(this).attr('data3')
                $.post("https://nav_conce/buyDealer", JSON.stringify({
                    name: carro,
                    price: preco,
                    stock: stock
                }));
            })
        }
    });
}))

    if ($('#logo').click(function () {
        $("#inicio").css("color", "red");
        $("#carros").css("color", "white");
        $("#motos").css("color", "white");
        $("#importados").css("color", "white");
        $("#possuidos").css("color", "white");
        $.ajax({
            dataType: "json",
            type: "GET",
            url: "http://localhost:5000/testes/allVeh",
            success: function (response) {
                let conteudo = ''

                let resposta = response.data
                $.each(resposta, function (key, value) {
                    conteudo +=
                        '<div class="content-items" data-action="' + value.id + '">' +
                        '                <img src="images/' + value.car + '.webp">' +
                        '                <a class="name">' + value.displayname + '</a>' +
                        '                <a class="mala">Porta-malas: ' + value.trunk + 'kg</a>' +
                        '                <a class="preco">Preço: $' + value.price + '</a>\n' +
                        '                <a class="stock">Disponíveis: ' + value.stock + '</a>\n' +
                        '                <button class="button" data="' + value.car + '" data2="' + value.price + '" data3="' + value.stock + '">Comprar</button>' +
                        '            </div>'
                });
                if (conteudo != '') {
                    $('#content').html("");
                    $('#content').append(conteudo);
                } else {
                    $('#content').append(conteudo);
                }
                $('button').click(function () {
                    let carro = $(this).attr('data')
                    let preco = $(this).attr('data2')
                    let stock = $(this).attr('data3')
                    $.post("https://nav_conce/buyDealer", JSON.stringify({
                        name: carro,
                        price: preco,
                        stock: stock
                    }));
                })
            }
        });
    }))

        if ($('#carros').click(function () {
            $("#inicio").css("color", "white");
            $("#carros").css("color", "red");
            $("#motos").css("color", "white");
            $("#importados").css("color", "white");
            $("#possuidos").css("color", "white");
            $.ajax({
                dataType: "json",
                type: "GET",
                url: "http://localhost:5000/testes/allCars",
                success: function (response) {
                    let conteudo = ''

                    let resposta = response.data
                    $.each(resposta, function (key, value) {
                        conteudo +=
                            '<div class="content-items" data-action="' + value.id + '">' +
                            '                <img src="images/' + value.car + '.webp">' +
                            '                <a class="name">' + value.displayname + '</a>' +
                            '                <a class="mala">Porta-malas: ' + value.trunk + 'kg</a>' +
                            '                <a class="preco">Preço: $' + value.price + '</a>\n' +
                            '                <a class="stock">Disponíveis: ' + value.stock + '</a>\n' +
                            '                <button class="button" data="' + value.car + '" data2="' + value.price + '" data3="' + value.stock + '">Comprar</button>' +
                            '            </div>'
                    });
                    if (conteudo != '') {
                        $('#content').html("");
                        $('#content').append(conteudo);
                    } else {
                        $('#content').append(conteudo);
                    }
                    $('button').click(function () {
                        let carro = $(this).attr('data')
                        let preco = $(this).attr('data2')
                        let stock = $(this).attr('data3')
                        $.post("https://nav_conce/buyDealer", JSON.stringify({
                            name: carro,
                            price: preco,
                            stock: stock
                        }));
                    })
                }
            });
        }))

            $('#motos').click(function () {
                $("#inicio").css("color", "white");
                $("#carros").css("color", "white");
                $("#motos").css("color", "red");
                $("#importados").css("color", "white");
                $("#possuidos").css("color", "white");
                $.ajax({
                    dataType: "json",
                    type: "GET",
                    url: "http://localhost:5000/testes/allMotos",
                    success: function (response) {
                        let conteudo = ''

                        let resposta = response.data
                        $.each(resposta, function (key, value) {
                            conteudo +=
                                '<div class="content-items" data-action="' + value.id + '">' +
                                '                <img src="images/' + value.car + '.webp">' +
                                '                <a class="name">' + value.displayname + '</a>' +
                                '                <a class="mala">Porta-malas: ' + value.trunk + 'kg</a>' +
                                '                <a class="preco">Preço: $' + value.price + '</a>\n' +
                                '                <a class="stock">Disponíveis: ' + value.stock + '</a>\n' +
                                '                <button class="button" data="' + value.car + '" data2="' + value.price + '" data3="' + value.stock + '">Comprar</button>' +
                                '            </div>'
                        });
                        if (conteudo != '') {
                            $('#content').html("");
                            $('#content').append(conteudo);
                        } else {
                            $('#content').append(conteudo);
                        }
                        $('button').click(function () {
                            let carro = $(this).attr('data')
                            let preco = $(this).attr('data2')
                            let stock = $(this).attr('data3')
                            $.post("https://nav_conce/buyDealer", JSON.stringify({
                                name: carro,
                                price: preco,
                                stock: stock
                            }));
                        })
                    }
                });
            })

$('#importados').click(function () {
    $("#inicio").css("color", "white");
    $("#carros").css("color", "white");
    $("#motos").css("color", "white");
    $("#importados").css("color", "red");
    $("#possuidos").css("color", "white");
    $.ajax({
        dataType: "json",
        type: "GET",
        url: "http://localhost:5000/testes/allImports",
        success: function (response) {
            let conteudo = ''

            let resposta = response.data
            $.each(resposta, function (key, value) {
                conteudo +=
                    '<div class="content-items" data-action="' + value.id + '">' +
                    '                <img src="images/' + value.car + '.webp">' +
                    '                <a class="name">' + value.displayname + '</a>' +
                    '                <a class="mala">Porta-malas: ' + value.trunk + 'kg</a>' +
                    '                <a class="preco">Preço: $' + value.price + '</a>\n' +
                    '                <a class="stock">Disponíveis: ' + value.stock + '</a>\n' +
                    '                <button class="button" data="' + value.car + '" data2="' + value.price + '" data3="' + value.stock + '">Comprar</button>' +
                    '            </div>'
            });
            if (conteudo != '') {
                $('#content').html("");
                $('#content').append(conteudo);
            } else {
                $('#content').append(conteudo);
            }
            $('button').click(function () {
                let carro = $(this).attr('data')
                let preco = $(this).attr('data2')
                let stock = $(this).attr('data3')
                $.post("https://nav_conce/buyImport", JSON.stringify({
                    name: carro,
                    price: preco,
                    stock: stock
                }));
            })
        }
    });
})

$('#possuidos').click(function () {
    $('#content').html("");
    $("#inicio").css("color", "white");
    $("#carros").css("color", "white");
    $("#motos").css("color", "white");
    $("#importados").css("color", "white");
    $("#possuidos").css("color", "red");
    $.ajax({
        dataType: "json",
        type: "GET",
        url: "http://localhost:5000/testes/userOwened/" + id,
        success: function (response) {
            let respostas = response.data
            $.each(respostas, function (k, v) {
                $.ajax({
                    dataType: "json",
                    type: "GET",
                    url: "http://localhost:5000/testes/vehInfo/" + v.vehicle,
                    success: function (response) {

                        let conteudo = ''

                        let resposta = response.data

                        $.each(resposta, function (key, value) {
                            conteudo +=
                                '<div class="content-items" data-action="' + value.id + '">' +
                                '                <img src="images/' + value.car + '.webp">' +
                                '                <a class="name">' + value.displayname + '</a>' +
                                '                <a class="mala">Porta-malas: ' + value.trunk + 'kg</a>' +
                                '                <a class="preco">Preço: $' + value.price + '</a>\n' +
                                '                <a class="stock">Disponíveis: ' + value.stock + '</a>\n' +
                                '                <button class="button" data="' + value.car + '" data2="' + value.price + '" data3="' + value.stock + '">Vender</button>' +
                                '            </div>'
                        });
                        $('#content').append(conteudo);


                        $('button').click(function () {
                            let carro = $(this).attr('data')
                            let preco = $(this).attr('data2')
                            let stock = $(this).attr('data3')
                            $.post("https://nav_conce/sellDealer", JSON.stringify({
                                name: carro,
                                price: preco,
                                stock: stock
                            }));
                            vendidoUpdate()
                        })
                    }
                })
            })

        }
    });
})


function vendidoUpdate() {
    $('#content').html("");
    $("#inicio").css("color", "white");
    $("#carros").css("color", "white");
    $("#motos").css("color", "white");
    $("#importados").css("color", "white");
    $("#possuidos").css("color", "red");
    $.ajax({
        dataType: "json",
        type: "GET",
        url: "http://localhost:5000/testes/userOwened/" + id,
        success: function (response) {
            let respostas = response.data
            $.each(respostas, function (k, v) {
                $.ajax({
                    dataType: "json",
                    type: "GET",
                    url: "http://localhost:5000/testes/vehInfo/" + v.vehicle,
                    success: function (response) {

                        let conteudo = ''

                        let resposta = response.data

                        $.each(resposta, function (key, value) {
                            conteudo +=
                                '<div class="content-items" data-action="' + value.id + '">' +
                                '                <img src="images/' + value.car + '.webp">' +
                                '                <a class="name">' + value.displayname + '</a>' +
                                '                <a class="mala">Porta-malas: ' + value.trunk + 'kg</a>' +
                                '                <a class="preco">Preço: $' + value.price + '</a>\n' +
                                '                <a class="stock">Disponíveis: ' + value.stock + '</a>\n' +
                                '                <button class="button" data="' + value.car + '" data2="' + value.price + '" data3="' + value.stock + '">Vender</button>' +
                                '            </div>'
                        });
                        $('#content').append(conteudo);


                        $('button').click(function () {
                            let carro = $(this).attr('data')
                            let preco = $(this).attr('data2')
                            let stock = $(this).attr('data3')
                            $.post("https://nav_conce/sellDealer", JSON.stringify({
                                name: carro,
                                price: preco,
                                stock: stock
                            }));
                            vendidoUpdate()
                        })
                    }
                })
            })

        }
    });
}