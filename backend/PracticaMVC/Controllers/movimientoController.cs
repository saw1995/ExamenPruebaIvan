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

    public class movimientoController : ControllerBase
    {
        [HttpPost("depositoRetiroByNroCuenta")]
        public async Task<respuestaModelo> depositoRetiroByNroCuenta(retiroDepositoModelo datos)
        {
            decimal nuevoSaldo = 0;

            var cuentaSaldo = await new cuentaData().cuentaByNroCuenta(datos.nro_cuenta);
            var myCuenta = cuentaSaldo.lista[0];

            if (datos.tipo == "D")
            {
                nuevoSaldo = Convert.ToDecimal(myCuenta.saldo.ToString()) - Convert.ToDecimal(datos.importe);

            }
            if (datos.tipo == "A")
            {
                nuevoSaldo = Convert.ToDecimal(myCuenta.saldo.ToString()) + Convert.ToDecimal(datos.importe);
            }

            var resultado = await new cuentaData().actualizarSaldoByNroCuenta(nuevoSaldo, datos.nro_cuenta);

            resultado = await new movimientoData().agregarMovimiento(datos.nro_cuenta, datos.tipo, datos.importe, "0.0", datos.glosa);
            
            return resultado;
        }

        [HttpPost("listaMovimientosById")]
        public async Task<listaMovimientoModelo> listaMovimientosById(movimientoModelo movimiento)
        {
            var resultado = await new movimientoData().listaMovimientosById(movimiento.nro_cuenta);
            return resultado;
        }
    }
}
