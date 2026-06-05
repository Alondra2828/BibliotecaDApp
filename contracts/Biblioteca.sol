// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Biblioteca {

    address public bibliotecario;

    constructor() {
        bibliotecario = msg.sender;
    }

struct Libro {
    uint id;
    string isbn;
    string titulo;
    string autor;
    bool disponible;
    address prestatario;
}

    uint public totalLibros;

    function obtenerTotalLibros()
public
view
returns(uint)
{
    return totalLibros;
}

    mapping(uint => Libro) public libros;

    event LibroAgregado(
        uint id,
        string titulo
    );

 event LibroPrestado(
    uint id,
    address estudiante,
    uint fechaPrestamo
);

event LibroDevuelto(
    uint id,
    address estudiante,
    uint fechaDevolucionReal
);

    modifier soloBibliotecario() {
        require(
            msg.sender == bibliotecario,
            "No autorizado"
        );
        _;
    }

function agregarLibro(
    string memory isbn,
    string memory titulo,
    string memory autor
) 

public soloBibliotecario {

        totalLibros++;

libros[totalLibros] = Libro(
    totalLibros,
    isbn,
    titulo,
    autor,
    true,
    address(0)
);

        emit LibroAgregado(
            totalLibros,
            titulo
        );
    }

    function prestarLibro(
        uint id,
        address estudiante
    ) public soloBibliotecario {

        require(
            libros[id].disponible,
            "Libro no disponible"
        );

        libros[id].disponible = false;
        libros[id].prestatario = estudiante;

        emit LibroPrestado(
    id,
    estudiante,
    block.timestamp
);
    }

function devolverLibro(
    uint id
) public soloBibliotecario {

    require(
        !libros[id].disponible,
        "Libro ya disponible"
    );

address estudiante =
    libros[id].prestatario;

libros[id].disponible = true;

libros[id].prestatario =
    address(0);

emit LibroDevuelto(
    id,
    estudiante,
    block.timestamp
);
}

    function consultarLibro(
        uint id
    )
        public
        view
returns(
    uint,
    string memory,
    string memory,
    string memory,
    bool,
    address
)
    {
        Libro memory l = libros[id];

return (
    l.id,
    l.isbn,
    l.titulo,
    l.autor,
    l.disponible,
    l.prestatario
);
    }
}