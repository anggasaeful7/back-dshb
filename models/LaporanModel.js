import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;
const Laporan = db.define(
  "laporan_perusahaan_jasa_transport",
  {
    tanggal: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nama_pemilik_barang: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nama_barang: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    jenis_moda_transportasi: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nama_kapal_pesawat: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    no_kendaraan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    jenis_kegiatan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    muatan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nomor_pib: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    volume_pib: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nomor_pbb: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    volume_pbb: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nomor_peb: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    volume_peb: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nomor_pmb: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    volume_pmb: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    jml_inklaring_outklaring: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    upload_surat_penunjukan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Laporan;
