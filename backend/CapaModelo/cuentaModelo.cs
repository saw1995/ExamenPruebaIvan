using System;
using System.Collections.Generic;

namespace CapaModelo
{
    public class cuentaModelo
    {
        public string nro_cuenta { get; set; }

        public string tipo { get; set; }

        public string moneda { get; set; }
        public string nombre { get; set; }
        public string saldo { get; set; }

    }

    public class listaCuentaModelo
    {
        public List<cuentaModelo> lista { get; set; }
    }
}
