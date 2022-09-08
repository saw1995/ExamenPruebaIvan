using CapaDatos;
using CapaModelo;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PracticaMVC.Controllers
{
    [ApiController]
    [Route("[controller]/")]

    public class cuentaController : ControllerBase
    {
        [HttpPost("agregarCuenta")]
        public async Task<respuestaModelo> agregarCuenta(cuentaModelo cuenta)
        {
            var resultado = await new cuentaData().agregarCuenta(cuenta.nro_cuenta, cuenta.tipo, cuenta.moneda, cuenta.nombre, cuenta.saldo);
            return resultado;
        }

        [HttpPost("listaCuentas")]
        public async Task<listaCuentaModelo> listaCuentas()
        {
            var resultado = await new cuentaData().listaCuentas();
            return resultado;
        }

        [HttpPost("cuentaByNroCuenta")]
        public async Task<listaCuentaModelo> cuentaByNroCuenta(cuentaModelo cuenta)
        {
            var resultado = await new cuentaData().cuentaByNroCuenta(cuenta.nro_cuenta);
            return resultado;
        }
    }
}
