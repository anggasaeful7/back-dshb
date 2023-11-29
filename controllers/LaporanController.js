import Laporan from "../models/LaporanModel.js";

export const getLaporan = async (req, res) => {
  try {
    const laporan = await Laporan.findAll();
    res.json({
      status: "success",
      message: "Laporan successfully loaded",
      data: laporan,
    });
  } catch (error) {
    console.log(error);
  }
};

export const createLaporan = async (req, res) => {
  const {
    tanggal,
    nama_pemilik_barang,
    nama_barang,
    jenis_moda_transportasi,
    nama_kapal_pesawat,
    no_kendaraan,
    jenis_kegiatan,
    muatan,
    nomor_pib,
    volume_pib,
    nomor_pbb,
    volume_pbb,
    nomor_peb,
    volume_peb,
    nomor_pmb,
    volume_pmb,
    jml_inklaring_outklaring,
    upload_surat_penujukan,
  } = req.body;

  try {
    await Laporan.create({
      tanggal,
      nama_pemilik_barang,
      nama_barang,
      jenis_moda_transportasi,
      nama_kapal_pesawat,
      no_kendaraan,
      jenis_kegiatan,
      muatan,
      nomor_pib,
      volume_pib,
      nomor_pbb,
      volume_pbb,
      nomor_peb,
      volume_peb,
      nomor_pmb,
      volume_pmb,
      jml_inklaring_outklaring,
      upload_surat_penujukan,
    });
    res.status(201).json({
      message: "Laporan successfully created",
      data: {
        tanggal,
        nama_pemilik_barang,
        nama_barang,
        jenis_moda_transportasi,
        nama_kapal_pesawat,
        no_kendaraan,
        jenis_kegiatan,
        muatan,
        nomor_pib,
        volume_pib,
        nomor_pbb,
        volume_pbb,
        nomor_peb,
        volume_peb,
        nomor_pmb,
        volume_pmb,
        jml_inklaring_outklaring,
        upload_surat_penujukan,
      },
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to create laporan",
      error: error.message,
    });
  }
};

export const updateLaporan = async (req, res) => {
  const { id } = req.params;
  const {
    tanggal,
    nama_pemilik_barang,
    nama_barang,
    jenis_moda_transportasi,
    nama_kapal_pesawat,
    no_kendaraan,
    jenis_kegiatan,
    muatan,
    nomor_pib,
    volume_pib,
    nomor_pbb,
    volume_pbb,
    nomor_peb,
    volume_peb,
    nomor_pmb,
    volume_pmb,
    jml_inklaring_outklaring,
    upload_surat_penujukan,
  } = req.body;

  try {
    const laporan = await Laporan.findOne({
      where: {
        id,
      },
    });

    if (!laporan) {
      return res.status(404).json({
        message: "Laporan not found",
      });
    }

    await laporan.update({
      tanggal,
      nama_pemilik_barang,
      nama_barang,
      jenis_moda_transportasi,
      nama_kapal_pesawat,
      no_kendaraan,
      jenis_kegiatan,
      muatan,
      nomor_pib,
      volume_pib,
      nomor_pbb,
      volume_pbb,
      nomor_peb,
      volume_peb,
      nomor_pmb,
      volume_pmb,
      jml_inklaring_outklaring,
      upload_surat_penujukan,
    });

    res.json({
      message: "Laporan successfully updated",
      data: {
        tanggal,
        nama_pemilik_barang,
        nama_barang,
        jenis_moda_transportasi,
        nama_kapal_pesawat,
        no_kendaraan,
        jenis_kegiatan,
        muatan,
        nomor_pib,
        volume_pib,
        nomor_pbb,
        volume_pbb,
        nomor_peb,
        volume_peb,
        nomor_pmb,
        volume_pmb,
        jml_inklaring_outklaring,
        upload_surat_penujukan,
      },
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to update laporan",
      error: error.message,
    });
  }
};

export const deleteLaporan = async (req, res) => {
  const { id } = req.params;

  try {
    const laporan = await Laporan.findOne({
      where: {
        id,
      },
    });

    if (!laporan) {
      return res.status(404).json({
        message: "Laporan not found",
      });
    }

    await laporan.destroy();

    res.json({
      message: "Laporan successfully deleted",
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to delete laporan",
      error: error.message,
    });
  }
};

export const getLaporanById = async (req, res) => {
  const { id } = req.params;

  try {
    const laporan = await Laporan.findOne({
      where: {
        id,
      },
    });

    if (!laporan) {
      return res.status(404).json({
        message: "Laporan not found",
      });
    }

    res.json({
      message: "Laporan successfully loaded",
      data: laporan,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to load laporan",
      error: error.message,
    });
  }
};
