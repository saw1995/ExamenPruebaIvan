using System;
using System.Collections.Generic;

namespace CapaModelo
{
    public class movimientoModelo
    {
        public string nro_cuenta { get; set; }

        public string fecha { get; set; }

        public string tipo { get; set; }
        public string importe { get; set; }
        public string tipo_cambio { get; set; }
        public string glosa { get; set; }

    }

    public class listaMovimientoModelo
    {
        public List<movimientoModelo> lista { get; set; }
    }
}
