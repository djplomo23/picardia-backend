const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const { isAdmin, isAuth, isSellerOrArmin } = require("../util");
const Factura = require("../models/facturaModel");
const Compra = require("../models/compraModel");
const Product = require("../models/productModel");
const moment = require("moment-timezone");
const Gastos = require("../models/gastosModel");

const facturaRouter = express.Router();

/*facturaRouter.get(
  '/',
  isAuth,

  expressAsyncHandler(async (req, res) => {
    

    const facturas = await Factura.find({ }).sort({'fecha': -1})
    res.send(facturas);
  }) 
);*/

facturaRouter.get(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const pageSize = 30;
    const page = Number(req.query.pageNumber) || 1;
    const name = req.query.name || "";
    const numFactura = req.query.name || "";
    const order = req.query.order || "";
    const min =
      req.query.min && Number(req.query.min) !== 0 ? Number(req.query.min) : 0;
    const max =
      req.query.max && Number(req.query.max) !== 0 ? Number(req.query.max) : 0;
    const rating =
      req.query.rating && Number(req.query.rating) !== 0
        ? Number(req.query.rating)
        : 0;

    const nameFilter = name
      ? { cuentaCliente: { $regex: name, $options: "i" } }
      : {};
    const categoryFilter = numFactura ? { numFactura } : {};
    const priceFilter = min && max ? { price: { $gte: min, $lte: max } } : {};
    const ratingFilter = rating ? { rating: { $gte: rating } } : {};
    const sortOrder =
      order === "lowest"
        ? { price: 1 }
        : order === "highest"
        ? { price: -1 }
        : order === "toprated"
        ? { rating: -1 }
        : { _id: -1 };
    const count = await Factura.countDocuments({
      ...nameFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    });
    const facturas = await Factura.find({
      ...nameFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    })
      .sort(sortOrder)
      .skip(pageSize * (page - 1))
      .limit(pageSize);

    res.send({ facturas, page, pages: Math.ceil(count / pageSize) });
  })
);

facturaRouter.get(
  "/compra",
  isAuth,

  expressAsyncHandler(async (req, res) => {
    const pageSize = 5;
    const page = Number(req.query.pageNumber) || 1;
    const name = req.query.name || "";
    const proveedor = req.query.proveedor || "";
    const order = req.query.order || "";
    const min =
      req.query.min && Number(req.query.min) !== 0 ? Number(req.query.min) : 0;
    const max =
      req.query.max && Number(req.query.max) !== 0 ? Number(req.query.max) : 0;
    const rating =
      req.query.rating && Number(req.query.rating) !== 0
        ? Number(req.query.rating)
        : 0;

    const nameFilter = name
      ? { proveedor: { $regex: name, $options: "i" } }
      : {};
    const categoryFilter = proveedor
      ? { proveedor: { $regex: proveedor, $options: "i" } }
      : {};
    const priceFilter = min && max ? { price: { $gte: min, $lte: max } } : {};
    const ratingFilter = rating ? { rating: { $gte: rating } } : {};
    const sortOrder =
      order === "lowest"
        ? { price: 1 }
        : order === "highest"
        ? { price: -1 }
        : order === "toprated"
        ? { rating: -1 }
        : { _id: -1 };
    const count = await Compra.countDocuments({
      ...nameFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    });
    const compras = await Compra.find({
      ...nameFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    })
      .sort(sortOrder)
      .skip(pageSize * (page - 1))
      .limit(pageSize);

    res.send({ compras, page, pages: Math.ceil(count / pageSize) });
  })
);

/*facturaRouter.get(
  '/compra',
  isAuth,

  expressAsyncHandler(async (req, res) => {
    

    const compras = await Compra.find({ }).sort({'fecha': -1})
    res.send(compras);
  })
);*/

facturaRouter.post(
  "/compra",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const compra = new Compra({
      numCompra: req.body.numCompra,
      fecha: req.body.fecha,
      metodoDepago: req.body.metodoDepago,
      proveedor: req.body.proveedor,
      products: req.body.products.map((product) => product),
      itbis: req.body.itbis,
      subTotal: req.body.subTotal,
      total: req.body.total,
      gastos: req.body.gastos,
    });

    for (let i = 0; i < compra.products.length; i++) {
      const element = compra.products[i];
      const elProducto = await Product.updateOne(
        { _id: element._id },
        { $inc: { countInStock: +element.countInStock } }
      );
    }

    const createdCompra = await compra.save();

    res
      .status(201)
      .send({ message: "Nueva Factura procesada", compra: createdCompra });
  })
);

/*-------- obtener el ultomo NCF de las facturas -----------*/

facturaRouter.get(
  "/lastNCF",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const lastNCF = await Factura.find({}).sort({ NCF: -1 }).limit(1);
    res.send(lastNCF);
  })
);

facturaRouter.post(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      const factura = new Factura({
        numFactura: req.body.numFactura,
        NCF: req.body.NCF,
        RNC: req.body.RNC,
        RNCName: req.body.RNCName,
        Vendedor: req.body.Vendedor,
        fecha: req.body.fecha,
        metodoDepago: req.body.metodoDePago,
        cuentaCliente: req.body.cuentaCliente,
        items: req.body.items.map((item) => item),
        isDolar: req.body.isDolar,
        isDiscount: req.body.isDiscount,
        itbis: req.body.itbis,
        subTotal: req.body.subTotal,
        totalDolar: req.body.totalDolar,
        total: req.body.total,
        comision: req.body.comision,
      });

      //console.log(factura);
      const items = req.body.items.map((item) => item);
      const createdFactura = await factura.save();

       for (let i = 0; i < items.length; i++) {
        const newProduct = await Product.updateOne(
          { _id: items[i]._id },
          { $inc: { countInStock: -items[i].cantidad } }
        );
        //const newProductSave = await newProduct.save()
      }
      res
        .status(201)
        .send({ message: "Nueva Factura procesada", factura: createdFactura });
    } catch (error) {
      res
      .status(500)
      .send(error);
      //console.log(error);
    }
  })
);

facturaRouter.post(
  "/gasto",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const gastosTotales = req.body;
    const fechas = gastosTotales.map((item) => item.fecha);

    const gasto = new Gastos({
      gastos: gastosTotales?.map((item) => {
        return { fecha: item.fecha, gasto: item.gasto, costo: item.costo };
      }),
    });

    const newGasto = await gasto.save();

    res
      .status(201)
      .send({ message: "Nueva Factura de gastos procesada", gasto: newGasto });
  })
);

facturaRouter.get(
  "/gasto",
  isAuth,

  expressAsyncHandler(async (req, res) => {
    const fechaInc = req.query.fechaInc;
    const fechaFin = req.query.fechaFin;

    const f = fechaFin
      .substring(0, 8)
      .concat(Number(fechaFin.substring(8)) + 1);
    const f2 = String(fechaInc);
    const fechaF = Number(fechaInc.substring(8));

    const fehcaNowInc = new Date(fechaInc);
    const fehcaNowFin = new Date(f);
    const date = new Date(fechaInc);

    /*------------------------------------------------------------------------------------

      //Aqui obtenemos el ultimo dia del mes 

      --------------------------------------------------------------------------------------*/

    const ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const ultimoDiaNumber = ultimoDia.getDate();

    if (Number(ultimoDia.getDate()) !== fechaF) {
      /*------------------------------------------------------------------------------------

      //Aqui verificamos si no es el ultimo dia del mes, si no es el ultimo dia del mes pues se realiza la consulta 

      --------------------------------------------------------------------------------------*/
      const k = new Date("2021-11-18T04:00:00.000Z");
      const gastos = await Gastos.aggregate([
        { $unwind: "$gastos" },
        {
          $match: {
            $expr: {
              $and: [
                { $eq: [{ $year: "$gastos.fecha" }, { $year: fehcaNowInc }] },
                { $eq: [{ $month: "$gastos.fecha" }, { $month: fehcaNowInc }] },
                {
                  $gte: [
                    { $dayOfMonth: "$gastos.fecha" },
                    { $dayOfMonth: fehcaNowInc },
                  ],
                },
                {
                  $lte: [
                    { $dayOfMonth: "$gastos.fecha" },
                    { $dayOfMonth: fehcaNowFin },
                  ],
                },
              ],
            },
          },
        },
      ]);

      res.send(gastos);
    } else if (ultimoDia.getDate() == fechaF) {
      /*------------------------------------------------------------------------------------

      //Aqui verificamos si es el ultimo dia del mes, si es el ultimo dia del mes pues se realiza la consulta 

      --------------------------------------------------------------------------------------*/

      const ultimoMes = new Date(date.getFullYear(), date.getMonth() + 1, 0);

      if (
        Number(12) == Number(fechaFin.substring(5, 7)) &&
        fechaF == Number(31)
      ) {
        /*------------------------------------------------------------------------------------

      //Aqui verificamos si es el ultimo mes y dia del año, si  es el ultimo mes y dia del año pues se realiza la consulta 

      --------------------------------------------------------------------------------------*/

        const fechaFinDeMes = new Date(
          Number(fechaFin.substring(0, 4)) + 1 + "-" + 1 + "-" + 1
        ); // esto es el primero de enero del año siguiente

        const facturas0 = await Gastos.aggregate([
          { $unwind: "$gastos" },
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: [{ $year: "$fecha" }, { $year: fehcaNowInc }] },
                  { $eq: [{ $month: "$fecha" }, { $month: fehcaNowInc }] },
                  {
                    $eq: [
                      { $dayOfMonth: "$fecha" },
                      { $dayOfMonth: fehcaNowInc },
                    ],
                  },
                ],
              },
            },
          },
        ]);

        const facturas1 = await Gastos.aggregate([
          { $unwind: "$gastos" },
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: [{ $year: "$fecha" }, { $year: fehcaNowInc }] },
                  { $eq: [{ $month: "$fecha" }, { $month: fechaFinDeMes }] },
                  {
                    $eq: [
                      { $dayOfMonth: "$fecha" },
                      { $dayOfMonth: fechaFinDeMes },
                    ],
                  },
                ],
              },
            },
          },
        ]);

        const gastos = facturas0.concat(facturas1);

        res.send(gastos);
      } else {
        /*------------------------------------------------------------------------------------

      //Aqui verificamos si no es el ultimo mes y dia del año, si no es el ultimo mes y dia del año pues se realiza la consulta 

      --------------------------------------------------------------------------------------*/

        const fechaFinDeMes = new Date(
          fechaFin
            .substring(0, 5)
            .concat(Number(fechaFin.substring(5, 7)) + 1 + "-1")
        );

        const facturas0 = await Gastos.aggregate([
          { $unwind: "$gastos" },
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: [{ $year: "$fecha" }, { $year: fehcaNowInc }] },
                  { $eq: [{ $month: "$fecha" }, { $month: fehcaNowInc }] },
                  {
                    $eq: [
                      { $dayOfMonth: "$fecha" },
                      { $dayOfMonth: fehcaNowInc },
                    ],
                  },
                ],
              },
            },
          },
        ]);

        const facturas1 = await Gastos.aggregate([
          { $unwind: "$gastos" },
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: [{ $year: "$fecha" }, { $year: fehcaNowInc }] },
                  { $eq: [{ $month: "$fecha" }, { $month: fechaFinDeMes }] },
                  {
                    $eq: [
                      { $dayOfMonth: "$fecha" },
                      { $dayOfMonth: fechaFinDeMes },
                    ],
                  },
                ],
              },
            },
          },
        ]);

        const gastos = facturas0.concat(facturas1);

        res.send(gastos);
      }
    }
  })
);

facturaRouter.get(
  "/comision",
  isAuth,

  expressAsyncHandler(async (req, res) => {
    const fechaInc = req.query.fechaInc;
    const fechaFin = req.query.fechaFin;
    const fechaF = Number(fechaFin.substring(3, 5));

    /*------------------------------------------------------------------------------------

      //Aqui obtenemos el ultimo dia del mes 

      --------------------------------------------------------------------------------------*/
    const date = new Date(fechaFin);

    const ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const ultimoDiaNumber = ultimoDia.getDate();

    const mes = fechaFin.substring(0, 2);
    const dia = Number(fechaFin.substring(3, 5)) + 1;
    const año = fechaFin.substring(6, 10);

    //const f = mes + '-' + dia + '-' + año

    const ultimoDiaDelMes = ultimoDia.getDate() == fechaF;

    const f = ultimoDiaDelMes
      ? mes + "-" + (Number(dia) - 1) + "-" + año
      : mes + "-" + dia + "-" + año;

    const f2 = fechaInc;

    const fehcaNowInc = new Date(f2);
    const fehcaNowFin = new Date(f);

    if (Number(ultimoDia.getDate()) !== fechaF) {
      /*------------------------------------------------------------------------------------
    
      //Aqui verificamos si no es el ultimo dia del mes, si no es el ultimo dia del mes pues se realiza la consulta 

      --------------------------------------------------------------------------------------*/

      const facturas = await Factura.find({
        $expr: {
          $and: [
            { $eq: [{ $year: "$fecha" }, { $year: fehcaNowInc }] },
            { $eq: [{ $month: "$fecha" }, { $month: fehcaNowInc }] },
            { $gte: [{ $dayOfMonth: "$fecha" }, { $dayOfMonth: fehcaNowInc }] },
            { $lte: [{ $dayOfMonth: "$fecha" }, { $dayOfMonth: fehcaNowFin }] },
          ],
        },
      });

      res.send(facturas);
    } else if (ultimoDia.getDate() == fechaF) {
      /*------------------------------------------------------------------------------------

      //Aqui verificamos si es el ultimo dia del mes, si es el ultimo dia del mes pues se realiza la consulta 

      --------------------------------------------------------------------------------------*/

      const ultimoMes = new Date(date.getFullYear(), date.getMonth() + 1, 0);

      if (
        Number(12) == Number(fechaFin.substring(0, 2)) &&
        fechaF == Number(31)
      ) {
        /*------------------------------------------------------------------------------------

      //Aqui verificamos si es el ultimo mes y dia del año, si  es el ultimo mes y dia del año pues se realiza la consulta 

      --------------------------------------------------------------------------------------*/

        const fechaFinDeMes = new Date(
          Number(fechaFin.substring(0, 4)) + 1 + "-" + 1 + "-" + 1
        ); // esto es el primero de enero del año siguiente

        const facturas0 = await Factura.find({
          $expr: {
            $and: [
              { $eq: [{ $year: "$fecha" }, { $year: fehcaNowInc }] },
              { $eq: [{ $month: "$fecha" }, { $month: fehcaNowInc }] },
              {
                $eq: [{ $dayOfMonth: "$fecha" }, { $dayOfMonth: fehcaNowInc }],
              },
            ],
          },
        });

        const facturas1 = await Factura.find({
          $expr: {
            $and: [
              { $eq: [{ $year: "$fecha" }, { $year: fehcaNowInc }] },
              { $eq: [{ $month: "$fecha" }, { $month: fechaFinDeMes }] },
              {
                $eq: [
                  { $dayOfMonth: "$fecha" },
                  { $dayOfMonth: fechaFinDeMes },
                ],
              },
            ],
          },
        });

        const facturas = facturas0.concat(facturas1);

        res.send(facturas);
      } else {
        /*------------------------------------------------------------------------------------

      //Aqui verificamos si no es el ultimo mes y dia del año, si no es el ultimo mes y dia del año pues se realiza la consulta 

      --------------------------------------------------------------------------------------*/

        const fechaFinDeMes = new Date(
          fechaFin
            .substring(0, 5)
            .concat(Number(fechaFin.substring(5, 7)) + 1 + "-1")
        );
        const fechaFinDeMesA = new Date(fechaFin);

        const facturas0 = await Factura.find({
          $expr: {
            $and: [
              { $eq: [{ $year: "$fecha" }, { $year: fehcaNowInc }] },
              { $eq: [{ $month: "$fecha" }, { $month: fehcaNowInc }] },
              {
                $gte: [{ $dayOfMonth: "$fecha" }, { $dayOfMonth: fehcaNowInc }],
              },
              {
                $lte: [
                  { $dayOfMonth: "$fecha" },
                  { $dayOfMonth: fechaFinDeMesA },
                ],
              },
            ],
          },
        });

        const facturas1 = await Factura.find({
          $expr: {
            $and: [
              { $eq: [{ $year: "$fecha" }, { $year: fehcaNowInc }] },
              { $eq: [{ $month: "$fecha" }, { $month: fechaFinDeMes }] },
              {
                $eq: [
                  { $dayOfMonth: "$fecha" },
                  { $dayOfMonth: fechaFinDeMes },
                ],
              },
            ],
          },
        });

        const facturas = facturas0.concat(facturas1);

        res.send(facturas);
      }
    }
  })
);

/*facturaRouter.get(
  '/hoy',
  isAuth,
 
  expressAsyncHandler(async (req, res) => {
    const fechaInc = req.query.fechaInc
    const fechaFin = req.query.fechaFin

    //const h = moment.tz(fechaInc, "Universal_Time_Coordinated")
    //const l = moment.tz(fechaFin, "Universal_Time_Coordinated")

    const f = fechaInc.substring(0, 8).concat(Number(fechaInc.substring(8)) - 1)
    const f2 = String(fechaInc)


    
    const fehcaNowInc = new Date(fechaInc)
    const fehcaNowFin = new Date(fechaFin)
    
    

    const facturas = await Factura.find({$expr:{ $and: [
      {$eq: [{$year: "$fecha"}, {$year: fehcaNowInc}]},
      {$eq: [{$month: "$fecha"}, {$month: fehcaNowInc}]},
      {$gte: [{$dayOfMonth: "$fecha"}, {$dayOfMonth: fehcaNowInc}]},   
      {$lte: [{$dayOfMonth: "$fecha"}, {$dayOfMonth: fehcaNowFin}]},    
     
    ]} })

    //const f = fehcaNowInc.slice(0, 8)

   

    res.send(facturas);
  })
);*/

facturaRouter.get(
  "/hoy",
  isAuth,

  expressAsyncHandler(async (req, res) => {
    const fechaInc = req.query.fechaInc;
    const fechaFin = req.query.fechaFin;

    const mes = fechaFin.substring(0, 2);
    const dia = Number(fechaFin.substring(3, 5)) + 1;
    const año = fechaFin.substring(6, 10);

    const f = mes + "-" + dia + "-" + año;
    const f2 = String(fechaInc);
    const fechaF = Number(fechaFin.substring(3, 5));

    const fehcaNowInc = new Date(fechaInc);
    const fehcaNowFin = new Date(f);
    const date = new Date(fechaInc);

    /*------------------------------------------------------------------------------------

      //Aqui obtenemos el ultimo dia del mes 

      --------------------------------------------------------------------------------------*/

    const ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const ultimoDiaNumber = ultimoDia.getDate();

    if (Number(ultimoDia.getDate()) !== fechaF) {
      /*------------------------------------------------------------------------------------

      //Aqui verificamos si no es el ultimo dia del mes, si no es el ultimo dia del mes pues se realiza la consulta 

      --------------------------------------------------------------------------------------*/

      const facturas = await Factura.find({
        $expr: {
          $and: [
            { $eq: [{ $year: "$fecha" }, { $year: fehcaNowInc }] },
            { $eq: [{ $month: "$fecha" }, { $month: fehcaNowInc }] },
            { $gte: [{ $dayOfMonth: "$fecha" }, { $dayOfMonth: fehcaNowInc }] },
            { $lte: [{ $dayOfMonth: "$fecha" }, { $dayOfMonth: fehcaNowFin }] },
          ],
        },
      });

      res.send(facturas);
    } else if (ultimoDia.getDate() == fechaF) {
      /*------------------------------------------------------------------------------------

      //Aqui verificamos si es el ultimo dia del mes, si es el ultimo dia del mes pues se realiza la consulta 

      --------------------------------------------------------------------------------------*/

      const ultimoMes = new Date(date.getFullYear(), date.getMonth() + 1, 0);

      if (Number(12) == mes && fechaF == Number(31)) {
        /*------------------------------------------------------------------------------------

      //Aqui verificamos si es el ultimo mes y dia del año, si  es el ultimo mes y dia del año pues se realiza la consulta 

      --------------------------------------------------------------------------------------*/

        const fechaFinDeMes = new Date(
          Number(fechaFin.substring(0, 4)) + 1 + "-" + 1 + "-" + 1
        ); // esto es el primero de enero del año siguiente

        const facturas0 = await Factura.find({
          $expr: {
            $and: [
              { $eq: [{ $year: "$fecha" }, { $year: fehcaNowInc }] },
              { $eq: [{ $month: "$fecha" }, { $month: fehcaNowInc }] },
              {
                $eq: [{ $dayOfMonth: "$fecha" }, { $dayOfMonth: fehcaNowInc }],
              },
            ],
          },
        });

        const facturas1 = await Factura.find({
          $expr: {
            $and: [
              { $eq: [{ $year: "$fecha" }, { $year: fehcaNowInc }] },
              { $eq: [{ $month: "$fecha" }, { $month: fechaFinDeMes }] },
              {
                $eq: [
                  { $dayOfMonth: "$fecha" },
                  { $dayOfMonth: fechaFinDeMes },
                ],
              },
            ],
          },
        });

        const facturas = facturas0.concat(facturas1);

        res.send(facturas);
      } else {
        /*------------------------------------------------------------------------------------

      //Aqui verificamos si no es el ultimo mes y dia del año, si no es el ultimo mes y dia del año pues se realiza la consulta 

      --------------------------------------------------------------------------------------*/

        const fechaFinDeMes = new Date(Number(mes) + 1 + "-" + "1" + "-" + año);

        const facturas0 = await Factura.find({
          $expr: {
            $and: [
              { $eq: [{ $year: "$fecha" }, { $year: fehcaNowInc }] },
              { $eq: [{ $month: "$fecha" }, { $month: fehcaNowInc }] },
              {
                $eq: [{ $dayOfMonth: "$fecha" }, { $dayOfMonth: fehcaNowInc }],
              },
            ],
          },
        });

        const facturas1 = await Factura.find({
          $expr: {
            $and: [
              { $eq: [{ $year: "$fecha" }, { $year: fehcaNowInc }] },
              { $eq: [{ $month: "$fecha" }, { $month: fechaFinDeMes }] },
              {
                $eq: [
                  { $dayOfMonth: "$fecha" },
                  { $dayOfMonth: fechaFinDeMes },
                ],
              },
            ],
          },
        });

        const facturas = facturas0.concat(facturas1);

        res.send(facturas);
      }
    }
  })
);

facturaRouter.get(
  "/mes",
  isAuth,

  expressAsyncHandler(async (req, res) => {
    const fechaInc = req.query.fechaInc;
    const fechaFin = req.query.fechaFin;
    const fechaF = Number(fechaFin.substring(8));

    /*------------------------------------------------------------------------------------

      //Aqui obtenemos el ultimo dia del mes 

      --------------------------------------------------------------------------------------*/
    const date = new Date(fechaFin);

    const ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const ultimoDiaNumber = ultimoDia.getDate();

    const ultimoDiaDelMes = ultimoDia.getDate() == fechaF;

    /* const f = ultimoDiaDelMes ? new Date(fechaFin.substring(0, 5).concat(Number(fechaFin.substring(5, 7)) + 1 +'-1')) : fechaFin.substring(0, 8).concat(Number(fechaFin.substring(8)) + 1) */

    const f2 = fechaInc;

    const fehcaNowInc = new Date(f2);
    const fehcaNowFin = new Date(fechaFin);

    if (Number(ultimoDia.getDate()) !== fechaF) {
      /*------------------------------------------------------------------------------------

      //Aqui verificamos si no es el ultimo dia del mes, si no es el ultimo dia del mes pues se realiza la consulta 

      --------------------------------------------------------------------------------------*/

      const facturas = await Factura.find({
        $expr: {
          $and: [
            { $eq: [{ $year: "$fecha" }, { $year: fehcaNowInc }] },
            { $eq: [{ $month: "$fecha" }, { $month: fehcaNowInc }] },
            { $gte: [{ $dayOfMonth: "$fecha" }, { $dayOfMonth: fehcaNowInc }] },
            { $lte: [{ $dayOfMonth: "$fecha" }, { $dayOfMonth: fehcaNowFin }] },
          ],
        },
      });

      res.send(facturas);
    } else if (ultimoDia.getDate() == fechaF) {
      /*------------------------------------------------------------------------------------

      //Aqui verificamos si es el ultimo dia del mes, si es el ultimo dia del mes pues se realiza la consulta 

      --------------------------------------------------------------------------------------*/

      const ultimoMes = new Date(date.getFullYear(), date.getMonth() + 1, 0);

      if (
        Number(12) == Number(fechaFin.substring(5, 7)) &&
        fechaF == Number(31)
      ) {
        /*------------------------------------------------------------------------------------

      //Aqui verificamos si es el ultimo mes y dia del año, si  es el ultimo mes y dia del año pues se realiza la consulta 

      --------------------------------------------------------------------------------------*/

        const fechaFinDeMes = new Date(
          Number(fechaFin.substring(0, 4)) + 1 + "-" + 1 + "-" + 1
        ); // esto es el primero de enero del año siguiente

        const facturas0 = await Factura.find({
          $expr: {
            $and: [
              { $eq: [{ $year: "$fecha" }, { $year: fehcaNowInc }] },
              { $eq: [{ $month: "$fecha" }, { $month: fehcaNowInc }] },
              {
                $eq: [{ $dayOfMonth: "$fecha" }, { $dayOfMonth: fehcaNowInc }],
              },
            ],
          },
        });

        const facturas1 = await Factura.find({
          $expr: {
            $and: [
              { $eq: [{ $year: "$fecha" }, { $year: fehcaNowInc }] },
              { $eq: [{ $month: "$fecha" }, { $month: fechaFinDeMes }] },
              {
                $eq: [
                  { $dayOfMonth: "$fecha" },
                  { $dayOfMonth: fechaFinDeMes },
                ],
              },
            ],
          },
        });

        const facturas = facturas0.concat(facturas1);

        res.send(facturas);
      } else {
        /*------------------------------------------------------------------------------------

      //Aqui verificamos si no es el ultimo mes y dia del año, si no es el ultimo mes y dia del año pues se realiza la consulta 

      --------------------------------------------------------------------------------------*/

        const fechaFinDeMes = new Date(
          fechaFin
            .substring(0, 5)
            .concat(Number(fechaFin.substring(5, 7)) + 1 + "-1")
        );
        const fechaFinDeMesA = new Date(fechaFin);

        const facturas0 = await Factura.find({
          $expr: {
            $and: [
              { $eq: [{ $year: "$fecha" }, { $year: fehcaNowInc }] },
              { $eq: [{ $month: "$fecha" }, { $month: fehcaNowInc }] },
              {
                $gte: [{ $dayOfMonth: "$fecha" }, { $dayOfMonth: fehcaNowInc }],
              },
              {
                $lte: [
                  { $dayOfMonth: "$fecha" },
                  { $dayOfMonth: fechaFinDeMesA },
                ],
              },
            ],
          },
        });

        const facturas1 = await Factura.find({
          $expr: {
            $and: [
              { $eq: [{ $year: "$fecha" }, { $year: fehcaNowInc }] },
              { $eq: [{ $month: "$fecha" }, { $month: fechaFinDeMes }] },
              {
                $eq: [
                  { $dayOfMonth: "$fecha" },
                  { $dayOfMonth: fechaFinDeMes },
                ],
              },
            ],
          },
        });

        const facturas = facturas0.concat(facturas1);

        res.send(facturas);
      }
    }
  })
);

/*facturaRouter.get(
  '/mes',
  isAuth,
 
  expressAsyncHandler(async (req, res) => {
    const fechaInc = req.query.fechaInc
    const fechaFin = req.query.fechaFin

    const fehcaNowInc = fechaInc
    const fehcaNowFin = fechaFin

    

    const facturas = await Factura.find({$expr:{ $and: [
      {$eq: [{$year: "$fecha"}, {$year: new Date(fehcaNowInc)}]},
      {$gte: [{$month: "$fecha"}, {$month: new Date(fehcaNowInc)}]},  
      {$lte: [{$month: "$fecha"}, {$month: new Date(fehcaNowFin)}]}, 
      
    
     
    ]} })

    res.send(facturas);

  })
);*/

facturaRouter.get(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const factura = await Factura.findById(req.params.id);
    if (factura) {
      res.send(factura);
    } else {
      res.status(404).send({ message: "Factura Not Found" });
    }
  })
);

facturaRouter.put(
  "/:id/pay",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "email name"
    );
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };
      const updatedOrder = await order.save();
      mailgun()
        .messages()
        .send(
          {
            from: "Amazona <amazona@mg.yourdomain.com>",
            to: `${order.user.name} <${order.user.email}>`,
            subject: `New order ${order._id}`,
            html: payOrderEmailTemplate(order),
          },
          (error, body) => {
            if (error) {
              console.log(error);
            } else {
              console.log(body);
            }
          }
        );
      res.send({ message: "Order Paid", order: updatedOrder });
    } else {
      res.status(404).send({ message: "Order Not Found" });
    }
  })
);

facturaRouter.delete(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const factura = await Factura.findById(req.params.id);

    if (factura) {
      const items = factura.items.map((item) => item);

      for (let i = 0; i < items.length; i++) {
        const newProduct = await Product.updateOne(
          { _id: items[i]._id },
          { $inc: { countInStock: +items[i].cantidad } }
        );
        //const newProductSave = await newProduct.save()
      }

      const deleteFactura = await factura.remove();
      res.send({ message: "Factura Deleted", factura: deleteFactura });
    } else {
      res.status(404).send({ message: "Factura Not Found" });
    }
  })
);

facturaRouter.delete(
  "/compra/:id",
  isAuth,

  expressAsyncHandler(async (req, res) => {
    const factura = await Compra.findById(req.params.id);

    if (factura) {
      {
        /* 

        const items = factura.items.map(item => item)

       for (let i = 0; i < items.length; i++) {
          const newProduct = await Product.updateOne({_id: items[i]._id}, {$inc: {countInStock: + items[i].cantidad}})
          //const newProductSave = await newProduct.save()
          
        }*/
      }

      const deleteFactura = await factura.remove();
      res.send({ message: "Factura Deleted", compra: deleteFactura });
    } else {
      res.status(404).send({ message: "Factura Not Found" });
    }
  })
);

facturaRouter.put(
  "/:id/deliver",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();

      const updatedOrder = await order.save();
      res.send({ message: "Order Delivered", order: updatedOrder });
    } else {
      res.status(404).send({ message: "Order Not Found" });
    }
  })
);

module.exports = facturaRouter;
