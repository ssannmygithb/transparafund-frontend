import { useState } from "react";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useWriteContract,
  useReadContract,
} from "wagmi";
import { metaMask } from "wagmi/connectors";
import { parseEther, formatEther } from "viem";
import {
  TRANSPARAFUND_ADDRESS,
  TRANSPARAFUND_ABI,
} from "./contracts/TransparaFund";

function CampaignCard({ id }: { id: number }) {
  const { address } = useAccount();
  const { writeContract, isPending } = useWriteContract();

  const [jumlahDonasi, setJumlahDonasi] = useState("");
  const [bukaDetail, setBukaDetail] = useState(false);
  const [deskripsiProposal, setDeskripsiProposal] = useState("");
  const [jumlahProposal, setJumlahProposal] = useState("");
  const [penerimaProposal, setPenerimaProposal] = useState("");

  const { data: campaignData } = useReadContract({
    address: TRANSPARAFUND_ADDRESS as `0x${string}`,
    abi: TRANSPARAFUND_ABI,
    functionName: "campaigns",
    args: [BigInt(id)],
  });

  if (!campaignData)
    return <div className="animate-pulse bg-slate-200 h-64 rounded-3xl"></div>;

  const [
    manager,
    title,
    targetAmount,
    ,
    totalCollected,
    donorsCount,
    numProposals,
  ] = campaignData as any;
  const targetEth = formatEther(targetAmount);
  const terkumpulEth = formatEther(totalCollected);
  const persentase = Math.min(
    (Number(terkumpulEth) / Number(targetEth)) * 100,
    100,
  );
  const isManager = address === manager;

  return (
    <div className="card overflow-hidden">
      <div className="bg-gradient-to-br from-[#3b82f6] to-[#10b981] -mx-6 -mt-6 p-6 pb-8 text-white relative">
        <div className="flex justify-between items-start mb-2">
          <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
            ID: {id}
          </span>
          <span className="text-xs font-medium opacity-80">
            {donorsCount.toString()} Donatur
          </span>
        </div>
        <h3 className="text-xl font-bold mb-4 leading-tight">{title}</h3>

        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 flex items-center justify-center bg-white/20 rounded-full border-4 border-white/30">
            <span className="font-bold text-sm">{persentase.toFixed(0)}%</span>
          </div>
          <div>
            <p className="text-3xl font-black">
              {terkumpulEth}{" "}
              <span className="text-sm font-medium opacity-80">ETH</span>
            </p>
            <p className="text-sm opacity-80">dari target {targetEth} ETH</p>
          </div>
        </div>
      </div>

      <div className="pt-6">
        <div className="flex justify-between items-center text-sm mb-4">
          <span className="text-slate-500 font-medium">Pengelola</span>
          <span className="font-mono bg-slate-100 px-2 py-1 rounded text-slate-700">
            {manager.slice(0, 6)}...{manager.slice(-4)}
          </span>
        </div>

        {!bukaDetail ? (
          <button
            onClick={() => setBukaDetail(true)}
            className="w-full bg-[#f4f7fe] hover:bg-[#e2e8f0] text-[#2563eb] font-bold py-3.5 rounded-2xl transition-colors"
          >
            Detail & Interaksi
          </button>
        ) : (
          <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
            {/* Area Interaksi (Donasi) */}
            <div className="bg-[#f0f9ff] p-4 rounded-2xl">
              <h4 className="text-sm font-bold text-[#0284c7] mb-2">
                Donasi ke Kampanye
              </h4>
              <div className="flex gap-2">
                <input
                  type="number"
                  step="0.001"
                  value={jumlahDonasi}
                  onChange={(e) => setJumlahDonasi(e.target.value)}
                  className="input-modern bg-white shadow-sm flex-1"
                  placeholder="Jumlah ETH"
                />
                <button
                  onClick={() =>
                    writeContract({
                      address: TRANSPARAFUND_ADDRESS as `0x${string}`,
                      abi: TRANSPARAFUND_ABI,
                      functionName: "donasi",
                      args: [BigInt(id)],
                      value: parseEther(jumlahDonasi),
                    })
                  }
                  disabled={isPending}
                  className="bg-[#0284c7] text-white px-4 rounded-2xl font-bold"
                >
                  Kirim
                </button>
              </div>
            </div>

            {/* Area Pengelola */}
            {isManager && (
              <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl">
                <h4 className="text-sm font-bold text-slate-800 mb-2">
                  Buat Proposal Pencairan
                </h4>
                <div className="space-y-2">
                  <input
                    type="text"
                    value={deskripsiProposal}
                    onChange={(e) => setDeskripsiProposal(e.target.value)}
                    placeholder="Tujuan (Beli Material)"
                    className="input-modern bg-white py-3 shadow-sm"
                  />
                  <div className="flex gap-2">
                    <input
                      type="number"
                      step="0.001"
                      value={jumlahProposal}
                      onChange={(e) => setJumlahProposal(e.target.value)}
                      placeholder="ETH"
                      className="input-modern bg-white py-3 shadow-sm w-1/3"
                    />
                    <input
                      type="text"
                      value={penerimaProposal}
                      onChange={(e) => setPenerimaProposal(e.target.value)}
                      placeholder="Alamat Dompet Penerima"
                      className="input-modern bg-white py-3 shadow-sm w-2/3"
                    />
                  </div>
                  <button
                    onClick={() =>
                      writeContract({
                        address: TRANSPARAFUND_ADDRESS as `0x${string}`,
                        abi: TRANSPARAFUND_ABI,
                        functionName: "buatProposal",
                        args: [
                          BigInt(id),
                          deskripsiProposal,
                          parseEther(jumlahProposal),
                          penerimaProposal as `0x${string}`,
                        ],
                      })
                    }
                    disabled={isPending}
                    className="w-full bg-slate-800 text-white py-3 rounded-xl font-bold text-sm"
                  >
                    Ajukan Proposal
                  </button>
                </div>
              </div>
            )}

            {/* Area Transparansi */}
            <div className="bg-white border border-slate-100 p-4 rounded-2xl shadow-sm">
              <h4 className="text-sm font-bold text-slate-800 mb-2">
                Daftar Proposal Aktif ({Number(numProposals)})
              </h4>
              {Number(numProposals) > 0 && (
                <div className="flex justify-between items-center bg-[#f4f7fe] p-3 rounded-xl">
                  <span className="text-sm font-medium text-slate-600">
                    Proposal #{Number(numProposals) - 1}
                  </span>
                  <button
                    onClick={() =>
                      writeContract({
                        address: TRANSPARAFUND_ADDRESS as `0x${string}`,
                        abi: TRANSPARAFUND_ABI,
                        functionName: "setujuiProposal",
                        args: [BigInt(id), BigInt(Number(numProposals) - 1)],
                      })
                    }
                    disabled={isPending}
                    className="text-[#10b981] bg-[#10b981]/10 px-3 py-1.5 rounded-lg text-sm font-bold"
                  >
                    Beri Suara
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => setBukaDetail(false)}
              className="w-full text-slate-400 font-medium text-sm py-2"
            >
              Tutup
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// --- HALAMAN UTAMA ---
export default function App() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { writeContract, isPending } = useWriteContract();

  const [judul, setJudul] = useState("");
  const [targetDana, setTargetDana] = useState("");
  const [durasi, setDurasi] = useState("");

  const { data: numCampaignsData } = useReadContract({
    address: TRANSPARAFUND_ADDRESS as `0x${string}`,
    abi: TRANSPARAFUND_ABI,
    functionName: "numCampaigns",
  });
  const totalCampaigns = Number(numCampaignsData || 0);

  const handleBuatKampanye = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!judul || !targetDana || !durasi) return alert("Lengkapi data!");
    writeContract({
      address: TRANSPARAFUND_ADDRESS as `0x${string}`,
      abi: TRANSPARAFUND_ABI,
      functionName: "buatKampanye",
      args: [judul, parseEther(targetDana), BigInt(durasi)],
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f4f7fe]">
      {/* Header / Navbar */}
      <header className="bg-white/70 backdrop-blur-xl sticky top-0 z-50 border-b border-slate-100">
        <div className="max-w-md md:max-w-5xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#3b82f6] to-[#10b981] shadow-lg flex items-center justify-center text-white font-black text-xl">
              T
            </div>
            <h1 className="text-xl font-extrabold text-slate-800 hidden md:block">
              TransparaFund
            </h1>
          </div>

          {isConnected ? (
            <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-full p-1 pl-4 shadow-sm">
              <span className="text-sm font-mono text-slate-600 font-medium">
                {address?.slice(0, 6)}...{address?.slice(-4)}
              </span>
              <button
                onClick={() => disconnect()}
                className="bg-red-50 hover:bg-red-100 text-red-600 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
              >
                ✕
              </button>
            </div>
          ) : (
            <button
              onClick={() => connect({ connector: metaMask() })}
              className="bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-md"
            >
              Connect Wallet
            </button>
          )}
        </div>
      </header>

      {/* Konten Utama */}
      <main className="flex-grow max-w-md md:max-w-5xl mx-auto px-4 md:px-8 pt-8 pb-16">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-black text-slate-800 mb-2">
            Desentralisasi <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3b82f6] to-[#10b981]">
              Pendanaan.
            </span>
          </h2>
          <p className="text-slate-500 font-medium">
            Transparansi mutlak melalui Smart Contract.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-5">
            <div className="card sticky top-24">
              <h3 className="text-lg font-extrabold text-slate-800 mb-6 flex items-center justify-between">
                Buat Inisiatif Baru
                <span className="bg-[#f4f7fe] text-[#3b82f6] w-8 h-8 flex items-center justify-center rounded-full">
                  +
                </span>
              </h3>
              <form onSubmit={handleBuatKampanye} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">
                    Judul
                  </label>
                  <input
                    type="text"
                    value={judul}
                    onChange={(e) => setJudul(e.target.value)}
                    className="input-modern"
                    placeholder="Cth: Beasiswa Pendidikan"
                  />
                </div>
                <div className="flex gap-4">
                  <div className="w-1/2">
                    <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">
                      Target (ETH)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={targetDana}
                      onChange={(e) => setTargetDana(e.target.value)}
                      className="input-modern font-mono"
                      placeholder="0.5"
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">
                      Durasi (Hari)
                    </label>
                    <input
                      type="number"
                      value={durasi}
                      onChange={(e) => setDurasi(e.target.value)}
                      className="input-modern"
                      placeholder="30"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={!isConnected || isPending}
                  className="btn-primary mt-2"
                >
                  {isPending ? "Memproses..." : "Terbitkan Kampanye"}
                </button>
              </form>
            </div>
          </div>

          <div className="md:col-span-7">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-extrabold text-slate-800">
                Kampanye Aktif
              </h3>
              <span className="text-sm font-bold text-slate-500">
                {totalCampaigns} Ditemukan
              </span>
            </div>

            <div className="space-y-6">
              {totalCampaigns === 0 ? (
                <div className="card text-center py-16 bg-white/50 border-dashed border-2 border-slate-200">
                  <p className="text-slate-400 font-medium">
                    Belum ada inisiatif yang berjalan.
                  </p>
                </div>
              ) : (
                Array.from({ length: totalCampaigns }, (_, i) => (
                  <CampaignCard key={i} id={totalCampaigns - 1 - i} />
                ))
              )}
            </div>
          </div>
        </div>
      </main>

      {/* --- BAGIAN FOOTER BARU --- */}
      <footer className="bg-white border-t border-slate-100 py-8 mt-auto">
        <div className="max-w-md md:max-w-5xl mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#3b82f6] to-[#10b981] flex items-center justify-center text-white font-black text-sm">
              T
            </div>
            <span className="font-extrabold text-slate-800 text-sm">
              TransparaFund
            </span>
          </div>

          <p className="text-xs text-slate-400 text-center md:text-left font-medium">
            &copy; {new Date().getFullYear()} TransparaFund. Berjalan aman di
            Ethereum Sepolia Testnet.
          </p>

          <div className="flex items-center gap-4 text-xs font-bold">
            <a
              href={`https://sepolia.etherscan.io/address/${TRANSPARAFUND_ADDRESS}`}
              target="_blank"
              rel="noreferrer"
              className="text-[#3b82f6] hover:underline flex items-center gap-1"
            >
              Lihat Smart Contract ↗
            </a>
            <span className="text-slate-200">|</span>
            <span className="text-[#10b981] bg-[#10b981]/10 px-2.5 py-1 rounded-full text-[10px] tracking-wider uppercase">
              v1.0.0 MVP
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
