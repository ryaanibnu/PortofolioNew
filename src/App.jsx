import React, { useState, useEffect, useRef } from "react";
import {
  Files,
  Search,
  GitBranch,
  Play,
  RefreshCw,
  LayoutGrid,
  Settings,
  User,
  Terminal as TerminalIcon,
  FileCode,
  CheckCircle,
  ChevronRight,
  X,
  ChevronDown,
  HelpCircle,
  Bell,
  ArrowUpRight,
  Mail,
  Folder,
  FolderOpen,
  Info,
  Cpu,
  Award,
  Globe,
  Database,
  Terminal as TerminalLucide,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Custom SVG Brand Icons since they are not present in this lucide-react package version
const GithubIcon = ({ size = 16, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 16, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" rx="1" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const InstagramIcon = ({ size = 16, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

// Real CV Portfolio data for Ryan Ibnu Syahrani - Mapped to reference screenshots
const SKILLS_DATA = {
  keterampilan_teknis: [
    "Python",
    "MySQL",
    "XAMPP",
    "PHP",
    "Laravel",
    "Katalon Studio (Automated QA)",
    "Next.js",
    "React JS",
    "Figma",
    "Canva",
  ],
  keterampilan_non_teknis: [
    "Kepemimpinan (Leadership)",
    "Adaptabilitas Tinggi",
    "Kolaborasi & Manajemen Tim",
    "Berpikir Kritis (Critical Thinking)",
  ],
  modul_akademik: [
    "Desain & Optimasi Database",
    "Kurikulum Lab SISJAR & DASPRO",
    "Enterprise Architecture (SI4701)",
    "Analisis & Perancangan Sistem",
  ],
};

const PROJECTS_DATA = [
  {
    id: "testing-automation",
    title: "Website Rekrutmen Karyawan",
    description:
      "Merancang skenario pengujian otomatis end-to-end (E2E) menggunakan Katalon Studio untuk portal rekrutmen perusahaan. Proyek ini mengotomatiskan validasi formulir pelamar, kecocokan alur masuk login, dan fungsionalitas pengiriman dokumen guna menjamin kestabilan dan meminimalkan celah bug fungsional.",
    tech: [
      "Katalon Studio",
      "Automated QA",
      "Pengujian Software",
      "Skenario Uji E2E",
    ],
    role: "Spesialis Quality Assurance (QA)",
    status: "Selesai (2025)",
    image: "testing-automation.png",
    category: "QUALITY ASSURANCE · AUTOMATED QA · SKENARIO E2E",
    categoryColor: "text-amber-500",
    codeSnippet: `// Katalon E2E Test - Portal Rekrutmen Karyawan
import static com.kms.katalon.core.testcase.TestCaseFactory.findTestCase
import com.kms.katalon.core.webui.keyword.WebUiBuiltInKeywords as WebUI

WebUI.openBrowser('')
WebUI.navigateToUrl('http://rekrutmen.telkom.local/login')
WebUI.setText(findTestObject('Page_Login/input_username'), 'ryan.ibnu')
WebUI.setText(findTestObject('Page_Login/input_password'), 'secure123pass')
WebUI.click(findTestObject('Page_Login/btn_Kirim'))
WebUI.verifyElementPresent(findTestObject('Page_Dashboard/div_Welcome'), 5)
WebUI.closeBrowser()`,
  },
  {
    id: "data-warehouse-bi",
    title: "Hotel Reservasi Analytics",
    description:
      "Merancang arsitektur basis data relasional dimensional (skema tabel fakta dan dimensi) serta visualisasi dashboard Business Intelligence (BI) interaktif. Mempermudah manajemen dalam melacak tren reservasi hotel secara historis guna merumuskan keputusan strategis bisnis.",
    tech: [
      "MySQL",
      "Data Warehousing",
      "Business Intelligence",
      "Figma",
      "Canva",
    ],
    role: "Database Engineer / Data Analyst",
    status: "Selesai (2025)",
    image: "data-warehouse-bi.png",
    icon: "📊",
    category: "DATABASE ENGINEER · DATA WAREHOUSE · BI ANALYTICS",
    categoryColor: "text-pink-500",
    codeSnippet: `-- SQL Dimensional Data Warehouse Definition
CREATE TABLE FactReservations (
    ReservationID INT PRIMARY KEY,
    CustomerKey INT,
    RoomTypeKey INT,
    DateKey INT,
    Revenue DECIMAL(10, 2),
    LeadTimeDays INT,
    FOREIGN KEY (CustomerKey) REFERENCES DimCustomers(CustomerKey),
    FOREIGN KEY (DateKey) REFERENCES DimDate(DateKey)
);`,
  },
  {
    id: "connect-b2b",
    title: "ConnectB2B Platform",
    description:
      "Membangun platform B2B terintegrasi 'ConnectB2B' menggunakan Next.js untuk menghubungkan pelaku UMKM dengan rantai industri besar. Dilengkapi dengan panel dasbor interaktif, sistem pelacakan transaksi yang aman, serta manajemen pergudangan komprehensif.",
    tech: ["Next.js", "B2B Platform", "Tailwind CSS", "API Integrasi", "Figma"],
    role: "Fullstack Developer / System Designer",
    status: "Selesai (2025)",
    image: "connect-b2b.png",
    icon: "🔌",
    category: "FULL STACK · API INTEGRATION · B2B PLATFORM",
    categoryColor: "text-blue-400",
    codeSnippet: `// Next.js API Route - ConnectB2B Transaction Pipeline
export async function POST(req) {
  const body = await req.json();
  const { orderId, umkmId, industryId, amount } = body;
  
  const transaction = await db.transaction.create({
    data: { orderId, umkmId, industryId, amount, status: 'PROCESSED' }
  });
  
  return NextResponse.json({ success: true, transaction });
}`,
  },
  {
    id: "umkm-pasirlangu",
    title: "Website UMKM Desa Pasirlangu",
    description:
      "Mengembangkan platform digital etalase produk UMKM Desa Pasirlangu menggunakan Next.js. Proyek ini bertujuan mendigitalkan promosi kerajinan dan produk khas desa, membantu memperluas pasar digital, serta meningkatkan omzet penjualan pengusaha lokal.",
    tech: ["Next.js", "Web App", "Tailwind CSS", "Desain UI/UX", "Canva"],
    role: "Frontend Developer",
    status: "Selesai (2025)",
    image: "umkm-pasirlangu.png",
    icon: "🛒",
    category: "FRONT END · WEB APP · UMKM DIGITALISASI",
    categoryColor: "text-emerald-400",
    codeSnippet: `// React Component - Pasirlangu Product Showcase
export default function ProductShowcase({ products }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {products.map((item) => (
        <div key={item.id} className="border border-zinc-800 p-4 rounded bg-zinc-900">
          <img src={item.imageUrl} alt={item.name} className="w-full h-40 object-cover" />
          <h4 className="text-white font-bold mt-2">{item.name}</h4>
          <p className="text-zinc-400 text-xs">{item.description}</p>
        </div>
      ))}
    </div>
  );
}`,
  },
];

const EXPERIENCE_DATA = [
  {
    role: "Koordinator Biro Dedikasi Masyarakat",
    company: "Himpunan Mahasiswa Sistem Informasi",
    location: "Bandung",
    duration: "Apr 2026 - Sekarang",
    active: true,
    details: [
      "Memimpin dan mengoordinasikan tim dalam merencanakan serta melaksanakan program-program pengabdian masyarakat dan inisiatif penggalangan dana sosial.",
      "Mengelola seluruh perencanaan program kerja biro, pembagian delegasi tugas anggota, dan menyusun evaluasi komprehensif pasca-kegiatan.",
      "Mengambil keputusan strategis tertinggi di biro untuk menjamin kelancaran pelaksanaan kontribusi sosial kemasyarakatan.",
    ],
    tech: [
      "Kepemimpinan",
      "Kolaborasi",
      "Manajemen Proyek",
      "Komunikasi Publik",
    ],
  },
  {
    role: "Staff Biro Dedikasi Masyarakat",
    company: "Himpunan Mahasiswa Sistem Informasi",
    location: "Bandung",
    duration: "Feb 2025 - Des 2025",
    active: false,
    details: [
      "Menyelenggarakan kegiatan penjangkauan sosial masyarakat dan menyusun rancangan program penggalangan dana sosial.",
      "Menyusun dan merancang proposal pendanaan formal untuk program kerja kemasyarakatan guna mendapatkan dukungan dana sponsor.",
      "Mengembangkan inisiatif inovatif dan solusi kreatif untuk menyukseskan pembangunan wilayah desa binaan mahasiswa.",
    ],
    tech: [
      "Proposal Teknis",
      "Fundraising",
      "Dedikasi Sosial",
      "Analisis Wilayah",
    ],
  },
  {
    role: "Asisten Praktikum Sistem Basis Data DASPRO",
    company: "Laboratorium Telkom University",
    location: "Bandung",
    duration: "Feb 2025 - Jul 2025",
    active: false,
    details: [
      "Mendampingi dosen pengampu dalam membimbing dan mengajar mahasiswa praktikan pada mata kuliah Sistem Basis Data di laboratorium dengan teknologi MySQL dan XAMPP.",
      "Merancang dan mengembangkan materi modul praktikum praktis mengenai DML (Data Manipulation Language).",
      "Menyusun tugas jurnal praktikum mingguan, menyajikan materi perkuliahan secara interaktif, serta mengawasi tata tertib guna menjaga kedisiplinan praktikan.",
    ],
    tech: ["MySQL", "SQL Query", "Desain Database", "Modul DML"],
  },
  {
    role: "Asisten Praktikum Sistem Operasi",
    company: "Laboratorium SISJAR (Sistem Jaringan)",
    location: "Bandung",
    duration: "Sep 2025 - Des 2025",
    active: false,
    details: [
      "Membimbing mahasiswa praktikan di laboratorium dalam memahami konsep administrasi sistem operasi menggunakan distro Rocky Linux, Ubuntu, dan Kali Linux.",
      "Merancang dan menyusun modul praktikum terstruktur mengenai pemanfaatan Kali Linux untuk pengujian keamanan dasar.",
      "Menjelaskan materi sesi praktikum secara komprehensif serta mengelola tata tertib kelas laboratorium agar proses belajar berjalan optimal.",
    ],
    tech: [
      "Rocky Linux",
      "Ubuntu Admin",
      "Kali Linux Security",
      "Sistem Operasi",
    ],
  },
];

const CERTIFICATIONS_DATA = [
  {
    name: "Fundamental Database MySQL",
    issuer: "Coding Studio Academy",
    desc: "Menguasai perancangan database relasional, teknik kueri kustom DML/DDL tingkat lanjut, serta optimalisasi basis data untuk menjamin efisiensi transaksi data berskala besar.",
    image: "database-certificate.png",
    icon: "📊",
    category: "DATABASE · MYSQL · CORE SQL",
    categoryColor: "text-yellow-500",
    skills: [
      "MySQL",
      "Database Design",
      "DDL/DML Queries",
      "Query Optimization",
    ],
  },
  {
    name: "Study Group EIM Laboratory",
    issuer: "Telkom University",
    desc: "Pelatihan khusus dan kolaborasi riset intensif di bawah naungan Laboratorium Enterprise Integration Management (EIM) mengenai integrasi proses bisnis modern.",
    image: "eim-certificate.png",
    icon: "🏫",
    category: "ENTERPRISE · BUSINESS INTEGRATION · ACADEMIC",
    categoryColor: "text-cyan-400",
    skills: ["Enterprise Systems", "Business Process", "System Integration"],
  },
  {
    name: "Fundamental Front End Web Development",
    issuer: "Developer Academy",
    desc: "Mempelajari dasar-dasar pengembangan antarmuka web modern menggunakan standar HTML5, CSS3, arsitektur responsif, serta dasar scripting backend PHP dan interaksi data.",
    image: "frontend-certificate.png",
    icon: "💻",
    category: "FRONT END · WEB DEVELOPMENT · UI DESIGN",
    categoryColor: "text-emerald-400",
    skills: ["HTML5", "CSS3 Layouts", "Vanilla CSS", "PHP Core"],
  },
  {
    name: "Data Structures in Python",
    issuer: "Google Career Certificates",
    desc: "Struktur data fundamental, teori kompleksitas algoritma (Big O), manipulasi array/dictionary/tuples, serta implementasi logika pemrograman terstruktur dengan Python.",
    image: "python-structures-cert.png",
    icon: "🐍",
    category: "PYTHON · ALGORITHM · DATA STRUCTURES",
    categoryColor: "text-[#3178c6]",
    skills: ["Python", "Algorithms", "Big O Complexity", "Data Structures"],
  },
  {
    name: "AI Fundamentals",
    issuer: "Google",
    desc: "Memahami prinsip kecerdasan buatan, konsep machine learning, neural networks, pemanfaatan model dasar generative AI, serta tantangan etika AI di dunia teknologi industri modern.",
    image: "ai-fundamentals-cert.png",
    icon: "🧠",
    category: "ARTIFICIAL INTELLIGENCE · MACHINE LEARNING",
    categoryColor: "text-purple-400",
    skills: ["Generative AI", "Machine Learning", "Neural Networks"],
  },
  {
    name: "AI for Brainstorming and Planning",
    issuer: "Google",
    desc: "Optimalisasi rekayasa perintah (prompt engineering) AI untuk penataan ide bisnis baru, perumusan struktur rencana proyek Agile, serta penyusunan tidur pelaksanaan teknis.",
    image: "ai-brainstorming-cert.png",
    icon: "💡",
    category: "PROMPT ENGINEERING · PROJECT PLANNING",
    categoryColor: "text-rose-400",
    skills: ["Prompt Engineering", "Agile Planning", "Brainstorming"],
  },
  {
    name: "AI for Content Creation",
    issuer: "Google",
    desc: "Memanfaatkan rekayasa prompt tingkat lanjut untuk pembuatan aset konten digital kreatif secara massal, copy-writing efisien, serta desain promosi pemasaran terarah.",
    image: "ai-content-creation-cert.png",
    icon: "🎨",
    category: "PROMPT ENGINEERING · CONTENT CREATION",
    categoryColor: "text-pink-400",
    skills: ["Prompt Engineering", "Content Creation", "Digital Assets"],
  },
];

export default function App() {
  const [openTabs, setOpenTabs] = useState(["Home.tsx", "Certificates.json"]);
  const [activeTab, setActiveTab] = useState("Home.tsx");
  const [explorerExpanded, setExplorerExpanded] = useState(true);

  // CSS Contact form fields (styled as custom properties inside active CSS editor)
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactSubject, setContactSubject] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactStatus, setContactStatus] = useState("");

  // Selected project in projects panel
  const [selectedProject, setSelectedProject] = useState(PROJECTS_DATA[0]);

  // Certificates modal states
  const [activeCertModal, setActiveCertModal] = useState(null);
  const [zoomScale, setZoomScale] = useState(100);

  const contentRef = useRef(null);
  const [lineCount, setLineCount] = useState(100);

  useEffect(() => {
    setZoomScale(100);
  }, [activeTab]);

  useEffect(() => {
    // Kembalikan viewport ke standar responsif mobile
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
      viewport.setAttribute("content", "width=device-width, initial-scale=1.0");
    }

    // Otomatis sembunyikan sidebar explorer pada layar mobile agar ruang editor maksimal
    if (window.innerWidth < 768) {
      setExplorerExpanded(false);
    }
  }, []);

  useEffect(() => {
    const updateLineCount = () => {
      if (contentRef.current) {
        const innerElement =
          contentRef.current.querySelector(".font-mono") ||
          contentRef.current.firstElementChild;
        const height = innerElement ? innerElement.scrollHeight : 0;
        const isMobile = window.innerWidth < 768;
        const maxLines = isMobile ? 45 : 70;
        const lines = Math.min(
          Math.max(30, Math.ceil((height + 16) / 24)),
          maxLines,
        );
        setLineCount(lines);
      }
    };

    updateLineCount();

    const timer = setTimeout(updateLineCount, 150);

    let resizeObserver;
    if (contentRef.current && typeof ResizeObserver !== "undefined") {
      const targetToObserve =
        contentRef.current.querySelector(".font-mono") ||
        contentRef.current.firstElementChild ||
        contentRef.current;
      resizeObserver = new ResizeObserver(() => {
        updateLineCount();
      });
      resizeObserver.observe(targetToObserve);
    }

    return () => {
      clearTimeout(timer);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [activeTab, selectedProject, contactStatus]);

  const openFile = (fileName) => {
    if (!openTabs.includes(fileName)) {
      setOpenTabs([...openTabs, fileName]);
    }
    setActiveTab(fileName);
  };

  const closeFile = (e, fileName) => {
    e.stopPropagation();
    const updatedTabs = openTabs.filter((t) => t !== fileName);
    setOpenTabs(updatedTabs);
    if (activeTab === fileName && updatedTabs.length > 0) {
      setActiveTab(updatedTabs[updatedTabs.length - 1]);
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) {
      setContactStatus("error");
      return;
    }

    setContactStatus("loading");

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey || "MASUKKAN_ACCESS_KEY_ANDA_DI_SINI",
          name: contactName,
          email: contactEmail,
          subject:
            contactSubject || `Pesan Baru Portofolio dari ${contactName}`,
          message: contactMessage,
          from_name: "Portofolio Ryan Ibnu Syahrani",
        }),
      });

      const data = await response.json();

      if (data.success) {
        setContactStatus("success");
        setContactName("");
        setContactEmail("");
        setContactSubject("");
        setContactMessage("");
      } else {
        console.error("Gagal mengirim pesan via Web3Forms:", data);
        setContactStatus("api_error");
      }
    } catch (error) {
      console.error("Kesalahan koneksi saat mengirim formulir kontak:", error);
      setContactStatus("connection_error");
    }
  };

  const getFileIcon = (fileName, size = 16) => {
    if (fileName && fileName.endsWith(".png")) {
      return <Award size={size} className="text-amber-500" />;
    }
    switch (fileName) {
      case "Home.tsx":
        return <FileCode size={size} className="text-cyan-400" />;
      case "About.html":
        return <Globe size={size} className="text-orange-500" />;
      case "Skills.json":
        return <Database size={size} className="text-yellow-400" />;
      case "Projects.js":
        return <FileCode size={size} className="text-yellow-500" />;
      case "Experience.ts":
        return <FileCode size={size} className="text-[#3178c6]" />;
      case "Contact.css":
        return <Cpu size={size} className="text-purple-400" />;
      case "Certificates.json":
        return <Award size={size} className="text-amber-400" />;
      default:
        return <FileCode size={size} className="text-zinc-400" />;
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-[#1e1e1e] font-sans overflow-hidden">
      {/* 1. TOP TITLE BAR */}
      <div className="h-9 bg-[#3c3c3c] border-b border-[#2d2d2d] flex items-center justify-between px-3 select-none text-[13px] text-[#cccccc] z-30 shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5 items-center">
            <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
          </div>
          <div className="hidden md:flex items-center gap-3 px-2 text-[#cccccc] font-light font-sans">
            <span className="hover:bg-[#505050] px-2 py-0.5 rounded cursor-pointer transition">
              File
            </span>
            <span className="hover:bg-[#505050] px-2 py-0.5 rounded cursor-pointer transition">
              Edit
            </span>
            <span className="hover:bg-[#505050] px-2 py-0.5 rounded cursor-pointer transition">
              View
            </span>
            <span className="hover:bg-[#505050] px-2 py-0.5 rounded cursor-pointer transition">
              Navigation
            </span>
            <span className="hover:bg-[#505050] px-2 py-0.5 rounded cursor-pointer transition">
              Run
            </span>
            <span className="hover:bg-[#505050] px-2 py-0.5 rounded cursor-pointer transition">
              Terminal
            </span>
            <span className="hover:bg-[#505050] px-2 py-0.5 rounded cursor-pointer transition">
              Help
            </span>
          </div>
        </div>

        {/* Search Palette / Command Center */}
        <div className="bg-[#2d2d2d] hover:bg-[#3d3d3d] border border-[#4d4d4d] rounded-md py-1 px-3 text-zinc-400 text-center w-full max-w-[180px] sm:max-w-[280px] md:max-w-[420px] mx-auto text-[11px] sm:text-[12px] flex items-center justify-between cursor-pointer select-none transition min-w-0">
          <span className="flex items-center gap-1.5 font-sans truncate pr-1">
            <Search size={12} className="shrink-0" />
            <span className="truncate">
              ryan-ibnu-syahrani : Portofolio Project
            </span>
          </span>
          <span className="hidden sm:inline-block text-[10px] text-zinc-500 bg-[#1e1e1e] border border-[#3e3e3e] px-1.5 py-0.5 rounded font-mono shrink-0">
            Ctrl+P
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-[12px] text-zinc-400"></div>
      </div>

      {/* 2. MAIN LAYOUT WINDOW CONTAINER */}
      <div className="flex-grow flex w-full overflow-hidden relative">
        {/* ACTIVITY BAR (Far Left - Thin) */}
        <div className="w-[52px] bg-[#333333] border-r border-[#2d2d2d] flex flex-col justify-between items-center py-2 select-none z-20 shrink-0">
          <div className="flex flex-col gap-2.5 w-full items-center">
            {/* Explorer Toggle button */}
            <button
              onClick={() => setExplorerExpanded(!explorerExpanded)}
              className={`p-3 relative w-full flex justify-center hover:text-white transition duration-200 ${explorerExpanded ? "text-white border-l-2 border-[#007acc]" : "text-zinc-500"}`}
              title="Explorer"
            >
              <Files size={22} />
            </button>
            <button
              className="p-3 w-full flex justify-center text-zinc-500 hover:text-white transition cursor-pointer"
              title="Cari"
            >
              <Search size={22} />
            </button>
            <button
              className="p-3 w-full flex justify-center text-zinc-500 hover:text-white transition cursor-pointer"
              title="Source Control (main)"
            >
              <div className="relative">
                <GitBranch size={22} />
                <span className="absolute -top-1 -right-1 bg-[#007acc] text-white text-[8px] font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center">
                  1
                </span>
              </div>
            </button>
            <button
              className="p-3 w-full flex justify-center text-zinc-500 hover:text-white transition cursor-pointer"
              title="Ekstensi"
            >
              <LayoutGrid size={22} />
            </button>
          </div>
          <div className="flex flex-col gap-3 items-center w-full">
            <a
              href="https://github.com/syahranii"
              target="_blank"
              rel="noreferrer"
              className="p-3 text-zinc-500 hover:text-white transition"
              title="Profil GitHub"
            >
              <GithubIcon size={22} />
            </a>
            <button
              className="text-zinc-500 hover:text-white transition cursor-pointer"
              title="Profil Pengguna"
            >
              <User size={20} />
            </button>
            <button
              className="text-zinc-500 hover:text-white transition cursor-pointer"
              title="Pengaturan"
            >
              <Settings size={20} />
            </button>
          </div>
        </div>

        {/* PRIMARY EXPLORER SIDEBAR */}
        <AnimatePresence initial={false}>
          {explorerExpanded && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 230, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="bg-[#252526] border-r border-[#2d2d2d] flex flex-col select-none overflow-hidden shrink-0 z-10"
            >
              <div className="p-2.5 text-[11px] font-bold text-zinc-400 tracking-wider flex items-center justify-between font-sans">
                <span>EXPLORER</span>
                <span className="text-zinc-500 font-mono text-[10px]">
                  RYAN-PORTOFOLIO
                </span>
              </div>

              {/* Collapsible PORTFOLIO Files tree */}
              <div className="flex-grow overflow-y-auto">
                <div className="flex items-center gap-1 py-1 px-2.5 text-[12px] font-bold text-zinc-300 bg-[#2d2d2d]/30 cursor-pointer font-sans">
                  <ChevronDown size={14} className="text-zinc-400" />
                  <span className="flex items-center gap-1.5">
                    <Folder size={14} className="text-cyan-500" />
                    PORTOFOLIO
                  </span>
                </div>

                {/* File list items */}
                <div className="flex flex-col text-[13px] pl-4">
                  {[
                    { name: "Home.tsx", path: "src/components/Home.tsx" },
                    { name: "About.html", path: "src/sections/About.html" },
                    { name: "Skills.json", path: "src/sections/Skills.json" },
                    { name: "Projects.js", path: "src/sections/Projects.js" },
                    {
                      name: "Experience.ts",
                      path: "src/sections/Experience.ts",
                    },
                    { name: "Contact.css", path: "src/sections/Contact.css" },
                    {
                      name: "Certificates.json",
                      path: "src/sections/Certificates.json",
                    },
                  ].map((file) => {
                    const isActive = activeTab === file.name;
                    return (
                      <button
                        key={file.name}
                        onClick={() => openFile(file.name)}
                        className={`group w-full flex items-center gap-2 py-1 px-2 hover:bg-[#2a2d2e] text-left transition duration-150 font-mono ${isActive ? "bg-[#37373d] text-white font-medium" : "text-zinc-400 hover:text-zinc-200"}`}
                      >
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <ChevronRight size={10} className="text-zinc-500" />
                        </span>
                        {getFileIcon(file.name)}
                        <span className="truncate">{file.name}</span>
                      </button>
                    );
                  })}

                  {/* PDF download node */}
                  <a
                    href="./CV-Ryan.pdf"
                    download="CV_Ryan_Ibnu_Syahrani.pdf"
                    className="w-full flex items-center gap-2 py-1 px-2 hover:bg-[#2a2d2e] text-left text-zinc-500 hover:text-zinc-300 transition duration-150 text-[13px] font-sans"
                    title="Unduh CV Format PDF"
                  >
                    <span className="opacity-0">
                      <ChevronRight size={10} />
                    </span>
                    <Award size={14} className="text-rose-400" />
                    <span>CV_Ryan Ibnu Syahrani.pdf</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* EDITOR AREA + TERMINAL GRID */}
        <div className="flex-grow flex flex-col overflow-hidden min-w-0">
          {/* TABS BAR */}
          <div className="h-9 bg-[#2d2d2d] flex items-center overflow-x-auto scrollbar-none select-none z-10 shrink-0">
            {openTabs.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <div
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`group h-full flex items-center gap-2 px-3 py-1.5 text-[12px] border-r border-[#252526] cursor-pointer min-w-[120px] max-w-[170px] transition duration-150 ${isActive ? "bg-[#1e1e1e] text-white border-t-2 border-[#007acc]" : "bg-[#2d2d2d] text-zinc-500 hover:bg-[#2b2b2b] hover:text-zinc-300"}`}
                >
                  {getFileIcon(tab)}
                  <span className="truncate flex-grow font-mono">{tab}</span>
                  <button
                    onClick={(e) => closeFile(e, tab)}
                    className="opacity-0 group-hover:opacity-100 p-0.5 rounded hover:bg-[#3c3c3c] text-zinc-500 hover:text-white transition duration-100"
                  >
                    <X size={12} />
                  </button>
                </div>
              );
            })}
          </div>

          {/* BREADCRUMB PATH */}
          <div className="h-6 bg-[#1e1e1e] border-b border-[#2d2d2d] px-4 flex items-center gap-1.5 text-[11px] text-zinc-500 select-none z-10 shrink-0 font-mono overflow-x-auto whitespace-nowrap scrollbar-none">
            <span className="hidden sm:inline">ryan-ibnu-syahrani</span>
            <ChevronRight size={10} className="hidden sm:inline shrink-0" />
            <span className="hidden sm:inline">portfolio</span>
            <ChevronRight size={10} className="hidden sm:inline shrink-0" />
            <span className="text-zinc-400 truncate">{activeTab}</span>
          </div>

          {/* DYNAMIC EDITOR PAGE RENDERING */}
          <div
            className={`flex-grow h-0 overflow-auto custom-scrollbar relative code-font text-[13px] md:text-[14px] ${activeTab && activeTab.endsWith(".png") ? "p-0 bg-[#151515]" : "p-2 sm:p-4"}`}
          >
            {openTabs.length === 0 ? (
              <div className="w-full h-full flex flex-col justify-center items-center text-zinc-500 gap-4 font-sans">
                <Files size={48} className="opacity-30" />
                <p className="text-[14px]">
                  Tidak ada dokumen terbuka. Silakan pilih salah satu file di
                  explorer sidebar kiri!
                </p>
              </div>
            ) : activeTab && activeTab.endsWith(".png") ? (
              /* Image Viewer Simulator */
              <div className="w-full h-full flex flex-col bg-[#161616] overflow-hidden select-none">
                {/* Control Bar */}
                <div className="h-10 bg-[#252526] border-b border-zinc-800 px-4 flex items-center justify-between text-zinc-400 text-xs shrink-0 select-none">
                  <div className="flex items-center gap-3">
                    <Award size={14} className="text-amber-500" />
                    <span className="font-mono text-zinc-300 font-semibold">
                      {activeTab}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    {/* Zoom Indicator */}
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-zinc-500 font-mono">
                        Zoom:
                      </span>
                      <span className="bg-[#1e1e1e] px-2 py-0.5 rounded border border-zinc-800 text-zinc-300 font-mono text-[10.5px] font-bold">
                        {zoomScale}%
                      </span>
                    </div>

                    {/* Zoom Slider */}
                    <input
                      type="range"
                      min="50"
                      max="200"
                      value={zoomScale}
                      onChange={(e) => setZoomScale(Number(e.target.value))}
                      className="w-20 accent-[#007acc] h-1 bg-zinc-800 rounded-lg cursor-pointer"
                    />

                    <button
                      onClick={() => setZoomScale(100)}
                      className="hover:text-white px-1.5 py-0.5 rounded hover:bg-zinc-800 transition font-mono text-[10.5px]"
                    >
                      Reset
                    </button>

                    <div className="h-4 w-px bg-zinc-800" />

                    {/* Download Button */}
                    <a
                      href={
                        activeTab.startsWith("projects/")
                          ? `/${activeTab}`
                          : `/certificates/${activeTab}`
                      }
                      download={activeTab}
                      className="px-2.5 py-1 bg-[#007acc] hover:bg-[#0062a3] text-white rounded font-sans font-bold text-[10.5px] transition flex items-center gap-1 cursor-pointer"
                    >
                      <span>Unduh</span>
                    </a>
                  </div>
                </div>

                {/* Canvas Area */}
                <div
                  className="flex-grow flex items-center justify-center relative p-8 bg-[#1c1c1c] overflow-auto select-none"
                  style={{
                    backgroundImage:
                      "linear-gradient(45deg,#131313 25%,transparent 25%), linear-gradient(-45deg,#131313 25%,transparent 25%), linear-gradient(45deg,transparent 75%,#131313 75%), linear-gradient(-45deg,transparent 75%,#131313 75%)",
                    backgroundSize: "20px 20px",
                    backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
                  }}
                >
                  <motion.div
                    style={{ scale: zoomScale / 100 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="relative flex items-center justify-center"
                  >
                    <img
                      src={
                        activeTab.startsWith("projects/")
                          ? `/${activeTab}`
                          : `/certificates/${activeTab}`
                      }
                      alt={activeTab}
                      className="max-w-full max-h-[60vh] object-contain shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-zinc-800/80 rounded bg-black/40"
                    />
                  </motion.div>
                </div>

                {/* Bottom Info Bar */}
                <div className="h-6 bg-[#252526] border-t border-zinc-800 px-4 flex items-center justify-between text-[11px] text-zinc-500 font-mono shrink-0 select-none">
                  <div>Format: Portable Network Graphics (PNG)</div>
                  <div className="flex gap-4">
                    <span>Verified: Yes</span>
                    <span>
                      Source: public/
                      {activeTab.startsWith("projects/")
                        ? activeTab
                        : `certificates/${activeTab}`}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full min-h-full flex items-start">
                {/* Visual Line Numbers */}
                <div className="w-8 shrink-0 text-right pr-3 border-r border-[#2d2d2d] text-[#858585] select-none text-[12px] leading-6 font-mono mr-2 sm:mr-4">
                  {Array.from({ length: lineCount }).map((_, i) => (
                    <div key={i}>{i + 1}</div>
                  ))}
                </div>

                {/* Editor Content Area */}
                <div
                  ref={contentRef}
                  className="flex-grow leading-6 w-full overflow-x-auto"
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="w-full h-full"
                    >
                      {/* HOME.TSX */}
                      {activeTab === "Home.tsx" && (
                        <div className="text-[#d4d4d4] w-full pb-8 select-text font-mono">
                          <div className="text-syntax-comment mb-2">
                            // Home.tsx - Halaman Utama Portofolio
                          </div>
                          <div>
                            <span className="text-syntax-tag">&lt;html</span>{" "}
                            <span className="text-syntax-variable">lang</span>=
                            <span className="text-syntax-string">"id"</span>
                            <span className="text-syntax-tag">&gt;</span>
                          </div>
                          <div className="pl-4">
                            <span className="text-syntax-tag">
                              &lt;body&gt;
                            </span>
                            <div></div>

                            <div className="pl-2 sm:pl-4 py-2 border-l border-[#333] my-2 font-sans select-text">
                              <div className="mb-4 md:mb-8">
                                <motion.h1
                                  initial={{ opacity: 0, y: 15 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className="text-[32px] sm:text-[40px] md:text-[62px] font-extrabold tracking-tight leading-none text-white font-unbounded"
                                >
                                  Ryan Ibnu
                                </motion.h1>
                                <motion.h1
                                  initial={{ opacity: 0, y: 15 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.1 }}
                                  className="text-[30px] sm:text-[38px] md:text-[60px] font-extrabold tracking-tight leading-none text-[#4fc1ff] font-unbounded"
                                >
                                  Syahrani
                                </motion.h1>
                              </div>

                              {/* Tag list */}
                              <div className="flex flex-wrap gap-2 mb-4 md:mb-8 select-none">
                                {[
                                  {
                                    text: "Quality Assurance",
                                    color: "bg-rose-500",
                                  },
                                  {
                                    text: "Data Analytics",
                                    color: "bg-emerald-500",
                                  },
                                  {
                                    text: "Sistem Informasi",
                                    color: "bg-sky-500",
                                  },
                                  {
                                    text: "@ TelkomUniversity",
                                    color: "bg-purple-500",
                                  },
                                ].map((tag) => (
                                  <span
                                    key={tag.text}
                                    className="flex items-center gap-1.5 px-3 py-1 bg-[#252526] border border-[#3e3e3e] rounded-full text-[11px] sm:text-[12px] font-mono text-zinc-300"
                                  >
                                    <span
                                      className={`w-2 h-2 rounded-full ${tag.color}`}
                                    />
                                    {tag.text}
                                  </span>
                                ))}
                              </div>

                              {/* Bio desc */}
                              <p className="text-[13px] sm:text-[14.5px] text-zinc-400 w-full font-sans mb-6 md:mb-10 leading-relaxed text-justify">
                                Halo! Nama saya Ryan Ibnu Syahrani. Saya
                                merupakan mahasiswa aktif S1 Program Studi
                                Sistem Informasi di Telkom University yang
                                memiliki ketertarikan besar pada bidang Website
                                Development dan Software Quality Assurance (QA).
                              </p>

                              {/* CTAs */}
                              <div className="flex flex-wrap gap-3 mb-6 md:mb-12 select-none">
                                <button
                                  onClick={() => openFile("Projects.js")}
                                  className="px-4 sm:px-6 py-2 bg-[#007acc] hover:bg-[#0062a3] text-white rounded font-mono font-bold text-[12px] sm:text-[13px] flex items-center gap-2 cursor-pointer transition transform hover:-translate-y-0.5"
                                >
                                  <FolderOpen size={14} />
                                  <span>Projects.js</span>
                                </button>
                                <button
                                  onClick={() => openFile("Experience.ts")}
                                  className="px-4 sm:px-6 py-2 bg-[#252526] hover:bg-[#2d2d2e] border border-[#4d4d4d] text-zinc-300 rounded font-mono font-semibold text-[12px] sm:text-[13px] flex items-center gap-2 cursor-pointer transition transform hover:-translate-y-0.5"
                                >
                                  <Award size={14} />
                                  <span>Experience.ts</span>
                                </button>
                                <button
                                  onClick={() => openFile("Contact.css")}
                                  className="px-4 sm:px-6 py-2 bg-[#252526] hover:bg-[#2d2d2e] border border-[#4d4d4d] text-zinc-300 rounded font-mono font-semibold text-[12px] sm:text-[13px] flex items-center gap-2 cursor-pointer transition transform hover:-translate-y-0.5"
                                >
                                  <Mail size={14} />
                                  <span>Contact.css</span>
                                </button>
                              </div>

                              {/* Stats grid widget */}
                              <div className="border border-[#2d2d2d] bg-[#1a1a1a] rounded p-4 sm:p-6 flex flex-wrap justify-center items-center gap-6 sm:gap-4 divide-y sm:divide-y-0 sm:divide-x divide-zinc-800 select-none font-mono max-w-4xl w-full">
                                {[
                                  { val: "3,70", label: "IPK AKUMULATIF" },
                                  {
                                    val: "4+",
                                    label: "PERAN LAB & ORGANISASI",
                                  },
                                  { val: "4", label: "PROYEK CV SELESAI" },
                                ].map((stat, sIdx) => (
                                  <div
                                    key={stat.label}
                                    className={`text-center flex-grow flex-shrink-0 min-w-[140px] sm:flex-1 ${sIdx > 0 ? "pt-4 sm:pt-0 sm:pl-4" : ""}`}
                                  >
                                    <div className="text-[20px] sm:text-[28px] font-bold text-white leading-none mb-1">
                                      {stat.val}
                                    </div>
                                    <div className="text-[9px] sm:text-[10px] text-zinc-500 uppercase tracking-widest">
                                      {stat.label}
                                    </div>
                                  </div>
                                ))}
                              </div>

                              {/* Social Terminal tags */}
                              <div className="mt-12 flex flex-wrap gap-2 text-[12px] text-zinc-400 select-none font-sans">
                                <span className="text-zinc-600 font-mono">
                                  // Hubungi saya melalui:
                                </span>
                                <a
                                  href="https://github.com/syahranii"
                                  target="_blank"
                                  rel="noreferrer"
                                  className="bg-[#252526] hover:bg-[#333] border border-[#3e3e3e] px-2 py-0.5 rounded flex items-center gap-1 transition"
                                >
                                  <GithubIcon size={12} /> Github
                                </a>
                                <a
                                  href="https://www.linkedin.com/in/ryan-ibnu-syahrani-5b2b812b8/"
                                  target="_blank"
                                  rel="noreferrer"
                                  className="bg-[#252526] hover:bg-[#333] border border-[#3e3e3e] px-2 py-0.5 rounded flex items-center gap-1 transition"
                                >
                                  <LinkedinIcon size={12} /> LinkedIn
                                </a>
                                <a
                                  href="mailto:ryanibnu2017@gmail.com"
                                  className="bg-[#252526] hover:bg-[#333] border border-[#3e3e3e] px-2 py-0.5 rounded flex items-center gap-1 transition"
                                >
                                  <Mail size={12} /> Email
                                </a>
                                <a
                                  href="https://instagram.com/ryanibnusyahrani"
                                  target="_blank"
                                  rel="noreferrer"
                                  className="bg-[#252526] hover:bg-[#333] border border-[#3e3e3e] px-2 py-0.5 rounded flex items-center gap-1 transition"
                                >
                                  <InstagramIcon size={12} /> Instagram
                                </a>
                              </div>
                            </div>

                            <div className="pl-4"></div>
                            <span className="text-syntax-tag">
                              &lt;/body&gt;
                            </span>
                          </div>
                          <div>
                            <span className="text-syntax-tag">
                              &lt;/html&gt;
                            </span>
                          </div>
                        </div>
                      )}

                      {/* ABOUT.HTML */}
                      {activeTab === "About.html" && (
                        <div className="text-zinc-300 font-mono pb-8">
                          <div className="text-syntax-comment">
                            // Profil Ringkasan & Riwayat Pendidikan
                          </div>
                          <div>
                            <span className="text-syntax-tag">&lt;html</span>{" "}
                            <span className="text-syntax-variable">lang</span>=
                            <span className="text-syntax-string">"id"</span>
                            <span className="text-syntax-tag">&gt;</span>
                          </div>
                          <div className="pl-4">
                            <span className="text-syntax-tag">
                              &lt;body&gt;
                            </span>

                            <div className="pl-2 sm:pl-4 py-2 border-l border-[#333] my-2 font-sans select-text">
                              <h2 className="text-white text-xl font-bold mb-3 flex items-center gap-2">
                                <User size={18} className="text-[#4fc1ff]" />{" "}
                                Tentang Saya
                              </h2>
                              <p className="text-zinc-400 mb-4 w-full leading-relaxed text-[14.5px] text-justify">
                                Halo! Nama saya Ryan Ibnu Syahrani. Saya
                                merupakan mahasiswa aktif S1 Program Studi
                                Sistem Informasi di Telkom University yang
                                memiliki ketertarikan besar pada bidang Website
                                Development dan Software Quality Assurance (QA).
                              </p>
                              <p className="text-zinc-400 mb-4 w-full leading-relaxed text-[14.5px] text-justify">
                                Saya fokus mengembangkan kemampuan dalam
                                membangun website yang responsif, interaktif,
                                dan user-friendly, sekaligus memahami proses
                                pengujian perangkat lunak untuk memastikan
                                kualitas aplikasi tetap optimal. Saya juga
                                senang mengeksplorasi teknologi modern, desain
                                kreatif, serta meningkatkan pengalaman pengguna
                                melalui pengembangan dan testing yang
                                terstruktur.
                              </p>

                              <h2 className="text-white text-lg font-semibold mt-6 mb-2 font-sans">
                                Riwayat Pendidikan Resmi
                              </h2>
                              <div className="flex flex-col gap-4 w-full">
                                <div className="bg-[#252526] border border-[#3e3e3e] p-4 rounded">
                                  <div className="flex justify-between items-center mb-1">
                                    <span className="text-white font-bold text-[14.5px]">
                                      Telkom University
                                    </span>
                                    <span className="text-zinc-500 text-[11px] font-mono">
                                      Sep 2023 - Mei 2027
                                    </span>
                                  </div>
                                  <div className="text-[#4fc1ff] text-[13px] font-medium font-mono mb-2">
                                    Sarjana (S1) Sistem Informasi — IPK: 3,70 /
                                    4,00
                                  </div>
                                  <ul className="list-disc pl-4 text-zinc-400 text-[13px] gap-1.5 flex flex-col font-sans">
                                    <li>
                                      Mendalami arsitektur basis data
                                      relasional, pemrograman berorientasi
                                      objek, arsitektur enterprise, serta
                                      rekayasa perangkat lunak.
                                    </li>
                                    <li>
                                      Meraih prestasi peringkat akademik Top 5
                                      Nilai Praktikum Analisis & Perancangan
                                      Sistem Informasi.
                                    </li>
                                  </ul>
                                </div>

                                <div className="bg-[#252526] border border-[#3e3e3e] p-4 rounded">
                                  <div className="flex justify-between items-center mb-1">
                                    <span className="text-white font-bold text-[14.5px]">
                                      SMA Islam Panglima Besar Soedirman 1
                                      Bekasi
                                    </span>
                                    <span className="text-zinc-500 text-[11px] font-mono">
                                      Jul 2020 - Jul 2023
                                    </span>
                                  </div>
                                  <div className="text-[#4fc1ff] text-[13px] font-medium font-mono mb-2">
                                    Sekolah Menengah Atas (MIPA) — Nilai
                                    Rata-Rata: 86,00 / 100,00
                                  </div>
                                  <ul className="list-disc pl-4 text-zinc-400 text-[13px] gap-1.5 flex flex-col font-sans">
                                    <li>
                                      Konsisten mempertahankan performa akademik
                                      dengan rata-rata nilai 86/100.
                                    </li>
                                    <li>
                                      Aktif mengembangkan kemampuan komunikasi
                                      dan kerja tim melalui project sekolah.
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>

                            <span className="text-syntax-tag">
                              &lt;/body&gt;
                            </span>
                          </div>
                          <div>
                            <span className="text-syntax-tag">
                              &lt;/html&gt;
                            </span>
                          </div>
                        </div>
                      )}

                      {/* SKILLS.JSON */}
                      {activeTab === "Skills.json" &&
                        (() => {
                          const techSkills = [
                            {
                              name: "Canva",
                              level: "82%",
                              status: "Intermediate",
                              desc: "Pembuatan desain grafis untuk media sosial, poster, banner, dan konten visual lainnya.",
                              color:
                                "from-blue-500/10 to-teal-500/10 border-blue-500/40",
                              barColor: "bg-blue-400 shadow-[0_0_8px_#60a5fa]",
                              icon: (
                                <Award size={15} className="text-blue-400" />
                              ),
                            },
                            {
                              name: "Figma",
                              level: "92%",
                              status: "Advanced",
                              desc: "Pengembangan desain antarmuka pengguna (UI/UX), wireframes, dan prototipe interaktif.",
                              color:
                                "from-[#f24e1e]/10 to-[#a259ff]/10 border-[#f24e1e]/40",
                              barColor:
                                "bg-purple-500 shadow-[0_0_8px_#a855f7]",
                              icon: (
                                <LayoutGrid
                                  size={15}
                                  className="text-purple-400"
                                />
                              ),
                            },
                            {
                              name: "Katalon Studio (Automated QA)",
                              level: "92%",
                              status: "Advanced",
                              desc: "Pengujian otomatis end-to-end, skenario web, dan validasi kualitas aplikasi.",
                              color:
                                "from-emerald-500/10 to-green-600/10 border-emerald-500/40",
                              barColor:
                                "bg-emerald-400 shadow-[0_0_8px_#34d399]",
                              icon: (
                                <CheckCircle
                                  size={15}
                                  className="text-emerald-400"
                                />
                              ),
                            },
                            {
                              name: "Laravel",
                              level: "92%",
                              status: "Advanced",
                              desc: "Struktur aplikasi MVC, desain RESTful API, dan manajemen basis data relasional.",
                              color:
                                "from-[#ff2d20]/10 to-[#ff2d20]/5 border-[#ff2d20]/40",
                              barColor: "bg-rose-500 shadow-[0_0_8px_#f43f5e]",
                              icon: (
                                <FileCode size={15} className="text-rose-500" />
                              ),
                            },
                            {
                              name: "MySQL",
                              level: "92%",
                              status: "Advanced",
                              desc: "Query DDL/DML, optimasi skema basis data, dan pemodelan analitis.",
                              color:
                                "from-sky-500/10 to-[#00758f]/10 border-sky-500/40",
                              barColor: "bg-sky-400 shadow-[0_0_8px_#38bdf8]",
                              icon: (
                                <Database size={15} className="text-sky-400" />
                              ),
                            },
                            {
                              name: "Next.js",
                              level: "92%",
                              status: "Advanced",
                              desc: "Server-Side Rendering (SSR), manajemen routing, dan optimalisasi performa aplikasi.",
                              color:
                                "from-zinc-500/10 to-zinc-500/5 border-zinc-700",
                              barColor: "bg-zinc-200 shadow-[0_0_8px_#e4e4e7]",
                              icon: (
                                <Globe size={15} className="text-zinc-200" />
                              ),
                            },
                            {
                              name: "PHP",
                              level: "82%",
                              status: "Intermediate",
                              desc: "Pengembangan logika backend, struktur data, dan integrasi aplikasi.",
                              color:
                                "from-[#4f5d95]/10 to-[#4f5d95]/5 border-[#4f5d95]/40",
                              barColor: "bg-[#4f5d95] shadow-[0_0_8px_#4f5d95]",
                              icon: (
                                <FileCode
                                  size={15}
                                  className="text-[#8892bf]"
                                />
                              ),
                            },
                            {
                              name: "Python",
                              level: "92%",
                              status: "Advanced",
                              desc: "Scripting OOP, algorithmic solutions, and structured logic implementation.",
                              color:
                                "from-[#306998]/10 to-[#ffd43b]/10 border-[#306998]/40",
                              barColor:
                                "bg-yellow-400 shadow-[0_0_8px_#f59e0b]",
                              icon: (
                                <TerminalIcon
                                  size={15}
                                  className="text-[#ffd43b]"
                                />
                              ),
                            },
                            {
                              name: "React JS",
                              level: "92%",
                              status: "Advanced",
                              desc: "Interactive UI component states, life-cycles, dynamic animations, and hooks.",
                              color:
                                "from-[#61dafb]/10 to-[#61dafb]/5 border-[#61dafb]/40",
                              barColor: "bg-cyan-400 shadow-[0_0_8px_#22d3ee]",
                              icon: <Cpu size={15} className="text-cyan-400" />,
                            },
                            {
                              name: "XAMPP",
                              level: "82%",
                              status: "Intermediate",
                              desc: "Local server configuration, database testing hosting, and Apache stack control.",
                              color:
                                "from-orange-500/10 to-amber-500/10 border-orange-500/40",
                              barColor:
                                "bg-orange-400 shadow-[0_0_8px_#fb923c]",
                              icon: (
                                <Settings
                                  size={15}
                                  className="text-orange-400"
                                />
                              ),
                            },
                          ];

                          const nonTechSkills = [
                            {
                              name: "Adaptabilitas Tinggi",
                              level: "92%",
                              desc: "Swiftly picking up modern programming language stacks and adapting to changing requirements.",
                              color:
                                "from-emerald-500/10 border-emerald-500/30 text-emerald-400",
                              icon: (
                                <RefreshCw
                                  size={15}
                                  className="text-emerald-400"
                                />
                              ),
                            },
                            {
                              name: "Berpikir Kritis (Critical Thinking)",
                              level: "92%",
                              desc: "Analyzing application error patterns to build solid testing structures and optimized workflows.",
                              color:
                                "from-rose-500/10 border-rose-500/30 text-rose-400",
                              icon: (
                                <Search size={15} className="text-rose-400" />
                              ),
                            },
                            {
                              name: "Kepemimpinan (Leadership)",
                              level: "92%",
                              desc: "Directing student divisions at Himpunan Sistem Informasi dynamically and tactically.",
                              color:
                                "from-amber-500/10 border-amber-500/30 text-amber-400",
                              icon: (
                                <Award size={16} className="text-amber-400" />
                              ),
                            },
                            {
                              name: "Kolaborasi & Manajemen Tim",
                              level: "92%",
                              desc: "Team coordination, active listening, structured tasks delegation, and group management.",
                              color:
                                "from-indigo-500/10 border-indigo-500/30 text-indigo-400",
                              icon: (
                                <User size={16} className="text-indigo-400" />
                              ),
                            },
                          ];

                          const academicModules = [
                            {
                              name: "Desain & Optimasi Database",
                              level: "92%",
                              desc: "Database normalization (1NF-3NF), query structure, indexes and custom procedures.",
                              icon: "📁",
                              borderColor: "border-cyan-500/30",
                            },
                            {
                              name: "Kurikulum Lab SISJAR & DASPRO",
                              level: "92%",
                              desc: "Laboratory system network, Ubuntu admin operations, OS structures, and basic coding syntax.",
                              icon: "🏫",
                              borderColor: "border-amber-500/30",
                            },
                            {
                              name: "Enterprise Architecture (SI4701)",
                              level: "82%",
                              desc: "Studying system integration structures, processes, and corporate modeling systems.",
                              icon: "🏢",
                              borderColor: "border-purple-500/30",
                            },
                            {
                              name: "Analisis & Perancangan Sistem",
                              level: "92%",
                              desc: "Modeling UML structures, use cases, sequential activities flows, and software blueprints.",
                              icon: "📊",
                              borderColor: "border-rose-500/30",
                            },
                          ];

                          return (
                            <div className="text-zinc-300 pb-8 font-mono select-text">
                              <div className="text-syntax-comment mb-2">
                                // Skills.json - Keterampilan Teknis &
                                Kompetensi Utama
                              </div>
                              <div>
                                <span className="text-syntax-tag">
                                  &lt;html
                                </span>{" "}
                                <span className="text-syntax-variable">
                                  lang
                                </span>
                                =
                                <span className="text-syntax-string">"id"</span>
                                <span className="text-syntax-tag">&gt;</span>
                              </div>
                              <div className="pl-4">
                                <span className="text-syntax-tag">
                                  &lt;body&gt;
                                </span>
                                <div></div>
                                <div className="pl-4"></div>

                                {/* Visual Revamped Skills Dashboard */}
                                <div className="pl-2 sm:pl-4 py-2 border-l border-[#333] my-2 font-sans select-text">
                                  <div className="flex flex-col gap-10 font-sans">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-0 sm:pl-4">
                                      {techSkills.map((skill) => (
                                        <div
                                          key={skill.name}
                                          className={`bg-gradient-to-br ${skill.color} border border-zinc-800 hover:border-zinc-400 p-4 rounded-xl hover:-translate-y-1 hover:shadow-[0_6px_20px_rgba(0,0,0,0.35)] transition-all duration-300 ease-out flex flex-col justify-between`}
                                        >
                                          <div>
                                            <div className="flex items-center justify-between mb-2">
                                              <div className="flex items-center gap-2.5">
                                                <span className="select-none flex items-center justify-center shrink-0 w-8 h-8 rounded bg-black/40 border border-zinc-800/80">
                                                  {skill.icon}
                                                </span>
                                                <h4 className="text-white font-bold text-sm tracking-wide">
                                                  {skill.name}
                                                </h4>
                                              </div>
                                            </div>
                                            <p className="text-xs text-zinc-400 leading-relaxed min-h-[32px]">
                                              {skill.desc}
                                            </p>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>

                                <div className="pl-4"></div>
                                <span className="text-syntax-tag">
                                  &lt;/body&gt;
                                </span>
                              </div>
                              <div>
                                <span className="text-syntax-tag">
                                  &lt;/html&gt;
                                </span>
                              </div>
                            </div>
                          );
                        })()}

                      {activeTab === "Projects.js" && (
                        <div className="text-zinc-300 w-full pb-8 font-mono select-text">
                          <div className="text-syntax-comment mb-2">
                            // Projects.js - Portofolio Proyek Rekayasa
                            Perangkat Lunak & QA
                          </div>
                          <div>
                            <span className="text-syntax-tag">&lt;html</span>{" "}
                            <span className="text-syntax-variable">lang</span>=
                            <span className="text-syntax-string">"id"</span>
                            <span className="text-syntax-tag">&gt;</span>
                          </div>
                          <div className="pl-4">
                            <span className="text-syntax-tag">
                              &lt;body&gt;
                            </span>
                            <div></div>

                            {/* Indented visual cards content */}
                            <div className="pl-2 sm:pl-4 py-2 border-l border-[#333] my-2 font-sans select-text">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 select-text mb-8">
                                {PROJECTS_DATA.map((proj) => {
                                  return (
                                    <div
                                      key={proj.id}
                                      className="bg-[#252526]/30 border border-[#2d2d2d] rounded-lg p-5 flex flex-col justify-between hover:border-zinc-500 hover:bg-[#252526]/50 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)] transition-all duration-300 ease-out"
                                    >
                                      <div>
                                        <div className="flex items-center justify-end mb-4">
                                          <div className="flex items-center gap-2">
                                            {proj.image && (
                                              <>
                                                <button
                                                  onClick={() =>
                                                    openFile(
                                                      `projects/${proj.image}`,
                                                    )
                                                  }
                                                  className="px-2.5 py-1 border border-zinc-700 bg-[#1e1e1e] hover:bg-zinc-800 text-zinc-400 hover:text-white rounded text-[11px] font-mono flex items-center gap-1 transition cursor-pointer select-none"
                                                  title="Buka di Tab Editor"
                                                >
                                                  <span>Editor ↗</span>
                                                </button>
                                                <button
                                                  onClick={() =>
                                                    setActiveCertModal({
                                                      name: proj.title,
                                                      issuer: proj.role,
                                                      desc: proj.description,
                                                      image: `projects/${proj.image}`,
                                                    })
                                                  }
                                                  className="px-2.5 py-1 border border-[#007acc]/30 bg-[#1e1e1e] hover:bg-[#007acc]/10 text-cyan-400 hover:text-white rounded text-[11px] font-mono flex items-center gap-1 transition cursor-pointer select-none"
                                                  title="Pratinjau Cepat"
                                                >
                                                  <span>Preview 👁️</span>
                                                </button>
                                              </>
                                            )}
                                          </div>
                                        </div>

                                        {/* Project Image Visual Thumbnail Slot */}
                                        {proj.image ? (
                                          <div
                                            className="relative w-full h-44 bg-zinc-950 rounded-lg overflow-hidden border border-zinc-850 mb-4 flex items-center justify-center group/img cursor-pointer"
                                            onClick={() =>
                                              setActiveCertModal({
                                                name: proj.title,
                                                issuer: proj.role,
                                                desc: proj.description,
                                                image: `projects/${proj.image}`,
                                              })
                                            }
                                          >
                                            <img
                                              src={`/projects/${proj.image}`}
                                              alt={proj.title}
                                              className="w-full h-full object-cover transition duration-300 group-hover/img:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-black/45 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center select-none">
                                              <span className="bg-black/70 border border-zinc-700 px-3 py-1.5 rounded-lg text-xs text-white flex items-center gap-1.5 font-mono font-semibold">
                                                🔍 pratinjau_cepat()
                                              </span>
                                            </div>
                                          </div>
                                        ) : (
                                          <div className="w-full h-44 bg-zinc-900/30 border border-zinc-800/80 rounded-lg flex flex-col justify-center items-center gap-2 mb-4 text-zinc-650 select-none">
                                            <Folder
                                              size={36}
                                              className="opacity-25 text-blue-400"
                                            />
                                            <span className="text-xs font-mono tracking-widest uppercase">
                                              No Image Available
                                            </span>
                                          </div>
                                        )}

                                        <div
                                          className={`text-[10.5px] ${proj.categoryColor || "text-amber-500"} font-bold uppercase tracking-wider mb-1 font-mono`}
                                        >
                                          {proj.category}
                                        </div>
                                        <h3 className="text-white text-[20px] font-extrabold font-unbounded tracking-normal mb-2 leading-tight select-text">
                                          {proj.title}
                                        </h3>
                                        <p className="text-[13px] text-zinc-400 leading-relaxed font-sans mb-4 text-justify select-text">
                                          {proj.description}
                                        </p>
                                      </div>

                                      <div className="flex flex-wrap gap-1.5 font-mono select-none">
                                        {proj.tech.map((t) => (
                                          <span
                                            key={t}
                                            className="bg-[#1e1e1e] border border-zinc-800 text-zinc-400 text-[10.5px] px-2 py-0.5 rounded"
                                          >
                                            {t}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>

                            <div></div>
                            <div className="mt-1"></div>
                            <span className="text-syntax-tag">
                              &lt;/body&gt;
                            </span>
                          </div>
                          <div>
                            <span className="text-syntax-tag">
                              &lt;/html&gt;
                            </span>
                          </div>
                        </div>
                      )}

                      {activeTab === "Experience.ts" && (
                        <div className="text-zinc-300 font-mono pb-8 select-text">
                          <div className="text-syntax-comment mb-2">
                            // Experience.ts - Riwayat Pengalaman Akademik &
                            Organisasi
                          </div>
                          <div>
                            <span className="text-syntax-tag">&lt;html</span>{" "}
                            <span className="text-syntax-variable">lang</span>=
                            <span className="text-syntax-string">"id"</span>
                            <span className="text-syntax-tag">&gt;</span>
                          </div>
                          <div className="pl-4">
                            <span className="text-syntax-tag">
                              &lt;body&gt;
                            </span>
                            <div></div>
                            <div className="pl-4"></div>
                            <div className="pl-4"></div>
                            <div className="pl-4"></div>
                            <div></div>
                            <div className="mt-2"></div>

                            {/* Indented visual timeline */}
                            <div className="pl-2 sm:pl-4 py-2 border-l border-[#333] my-2 font-sans select-text">
                              <div className="relative border-l-2 border-zinc-800 ml-4 pl-8 pb-4 flex flex-col gap-10 font-mono select-text">
                                {EXPERIENCE_DATA.map((exp, idx) => {
                                  return (
                                    <div key={idx} className="relative">
                                      {/* Timeline indicator circle with glowing dot inside */}
                                      <span
                                        className={`absolute -left-[42px] top-1 w-5 h-5 rounded-full border-2 ${exp.active ? "border-cyan-500 bg-[#1e1e1e]" : "border-zinc-700 bg-[#1e1e1e]"} flex items-center justify-center select-none`}
                                      >
                                        {exp.active && (
                                          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] animate-pulse" />
                                        )}
                                      </span>

                                      <div className="text-zinc-500 text-[12px] font-mono mb-1">
                                        {exp.duration}
                                      </div>
                                      <h2 className="text-white text-[22px] font-extrabold font-unbounded tracking-normal mb-1 select-text leading-tight">
                                        {exp.role}
                                      </h2>
                                      <div className="text-cyan-400 text-[14px] font-mono mb-3 select-text">
                                        @ {exp.company}
                                      </div>

                                      <p className="text-[13.5px] text-zinc-400 leading-relaxed font-sans mb-4 w-full text-justify select-text">
                                        {exp.details.join(" ")}
                                      </p>

                                      <div className="flex flex-wrap gap-2 select-none font-mono">
                                        {exp.tech.map((t) => (
                                          <span
                                            key={t}
                                            className="px-2.5 py-0.5 bg-[#007acc]/5 border border-[#007acc]/30 text-cyan-400 rounded text-[11px] hover:bg-[#007acc]/10 transition-colors"
                                          >
                                            {t}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>

                            <div></div>
                            <span className="text-syntax-tag">
                              &lt;/body&gt;
                            </span>
                          </div>
                          <div>
                            <span className="text-syntax-tag">
                              &lt;/html&gt;
                            </span>
                          </div>
                        </div>
                      )}

                      {activeTab === "Contact.css" && (
                        <div className="text-zinc-300 font-mono pb-8 select-text">
                          <div className="text-syntax-comment mb-2">
                            /* contact.css - Formulir Kontak & Informasi Sosial
                            */
                          </div>
                          <div>
                            <span className="text-syntax-tag">&lt;html</span>{" "}
                            <span className="text-syntax-variable">lang</span>=
                            <span className="text-syntax-string">"id"</span>
                            <span className="text-syntax-tag">&gt;</span>
                          </div>

                          <div className="pl-4">
                            <div></div>
                            <span className="text-syntax-tag">
                              &lt;body&gt;
                            </span>
                            <div className="pl-4"></div>
                            <div className="pl-4"></div>

                            {/* Two column visual layout exact from reference screenshot */}
                            <div className="pl-2 sm:pl-4 py-2 border-l border-[#333] my-2 font-sans select-text">
                              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 select-text">
                                {/* Left column: Temukan Saya */}
                                <div className="flex flex-col gap-3 font-sans">
                                  <h2 className="text-[#4fc1ff] text-sm font-bold tracking-widest uppercase mb-2 font-mono">
                                    Temukan Saya
                                  </h2>

                                  {[
                                    {
                                      title: "EMAIL",
                                      handle: "ryanibnu2017@gmail.com",
                                      href: "mailto:ryanibnu2017@gmail.com",
                                      borderBadge:
                                        "border-emerald-500/30 bg-[#252526]",
                                      color: "text-emerald-400",
                                      icon: (
                                        <Mail
                                          size={16}
                                          className="text-emerald-400"
                                        />
                                      ),
                                    },
                                    {
                                      title: "GITHUB",
                                      handle: "github.com/ryaanibnu",
                                      href: "https://github.com/ryaanibnu",
                                      borderBadge:
                                        "border-zinc-700 bg-[#252526]",
                                      color: "text-zinc-300",
                                      icon: (
                                        <GithubIcon
                                          size={16}
                                          className="text-zinc-300"
                                        />
                                      ),
                                    },
                                    {
                                      title: "LINKEDIN",
                                      handle:
                                        "linkedin.com/in/ryan-ibnu-syahrani-5b2b812b8",
                                      href: "https://www.linkedin.com/in/ryan-ibnu-syahrani-5b2b812b8/",
                                      borderBadge:
                                        "border-sky-500/30 bg-[#252526]",
                                      color: "text-sky-400",
                                      icon: (
                                        <LinkedinIcon
                                          size={16}
                                          className="text-sky-400"
                                        />
                                      ),
                                    },
                                    {
                                      title: "INSTAGRAM",
                                      handle: "instagram.com/ryaanibnu  ",
                                      href: "https://instagram.com/ryaanibnu",
                                      borderBadge:
                                        "border-pink-500/30 bg-[#252526]",
                                      color: "text-pink-400",
                                      icon: (
                                        <InstagramIcon
                                          size={16}
                                          className="text-pink-400"
                                        />
                                      ),
                                    },
                                  ].map((social) => {
                                    return (
                                      <a
                                        href={social.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        key={social.title}
                                        className="bg-[#252526]/40 border border-[#2d2d2d] rounded p-3 flex items-center justify-between group hover:border-zinc-400 hover:bg-[#252526]/70 hover:shadow-[0_4px_15px_rgba(0,0,0,0.25)] hover:-translate-y-0.5 transition-all duration-200 ease-out select-none"
                                      >
                                        <div className="flex items-center gap-3">
                                          <span
                                            className={`w-9 h-9 rounded border flex items-center justify-center ${social.borderBadge}`}
                                          >
                                            {social.icon}
                                          </span>
                                          <div>
                                            <div
                                              className={`text-[11px] font-bold font-mono tracking-wider ${social.color}`}
                                            >
                                              {social.title}
                                            </div>
                                            <div className="text-[13px] text-zinc-400 font-mono mt-0.5">
                                              {social.handle}
                                            </div>
                                          </div>
                                        </div>
                                        <ArrowUpRight
                                          size={14}
                                          className="text-zinc-600 group-hover:text-white transition-colors"
                                        />
                                      </a>
                                    );
                                  })}
                                </div>

                                {/* Right column: SEND A MESSAGE */}
                                <div className="flex flex-col gap-4 font-sans select-text">
                                  <h2 className="text-[#4fc1ff] text-sm font-bold tracking-widest uppercase mb-2 font-mono">
                                    Kirim Pesan
                                  </h2>

                                  <form
                                    onSubmit={handleContactSubmit}
                                    className="flex flex-col gap-4"
                                  >
                                    <div>
                                      <div className="text-zinc-500 text-[12px] font-mono mb-1.5 flex items-center">
                                        <span>// Nama Pengirim</span>
                                        <span className="text-rose-500 ml-1 font-bold">
                                          *
                                        </span>
                                      </div>
                                      <input
                                        type="text"
                                        required
                                        placeholder="string"
                                        value={contactName}
                                        onChange={(e) =>
                                          setContactName(e.target.value)
                                        }
                                        className="w-full bg-[#252526] border border-[#2d2d2d] px-3 py-2.5 rounded text-white font-mono text-[13px] focus:outline-none focus:border-[#007acc] placeholder-zinc-600 transition"
                                      />
                                    </div>

                                    <div>
                                      <div className="text-zinc-500 text-[12px] font-mono mb-1.5 flex items-center">
                                        <span>// Email Pengirim</span>
                                        <span className="text-rose-500 ml-1 font-bold">
                                          *
                                        </span>
                                      </div>
                                      <input
                                        type="email"
                                        required
                                        placeholder="string"
                                        value={contactEmail}
                                        onChange={(e) =>
                                          setContactEmail(e.target.value)
                                        }
                                        className="w-full bg-[#252526] border border-[#2d2d2d] px-3 py-2.5 rounded text-white font-mono text-[13px] focus:outline-none focus:border-[#007acc] placeholder-zinc-600 transition"
                                      />
                                    </div>

                                    <div>
                                      <div className="text-zinc-500 text-[12px] font-mono mb-1.5">
                                        // Subject
                                      </div>
                                      <input
                                        type="text"
                                        placeholder="string"
                                        value={contactSubject}
                                        onChange={(e) =>
                                          setContactSubject(e.target.value)
                                        }
                                        className="w-full bg-[#252526] border border-[#2d2d2d] px-3 py-2.5 rounded text-white font-mono text-[13px] focus:outline-none focus:border-[#007acc] placeholder-zinc-600 transition"
                                      />
                                    </div>

                                    <div>
                                      <div className="text-zinc-500 text-[12px] font-mono mb-1.5 flex items-center">
                                        <span>// Pesan</span>
                                        <span className="text-rose-500 ml-1 font-bold">
                                          *
                                        </span>
                                      </div>
                                      <textarea
                                        required
                                        rows={4}
                                        placeholder="'''your message'''"
                                        value={contactMessage}
                                        onChange={(e) =>
                                          setContactMessage(e.target.value)
                                        }
                                        className="w-full bg-[#252526] border border-[#2d2d2d] px-3 py-2.5 rounded text-white font-mono text-[13px] focus:outline-none focus:border-[#007acc] resize-none placeholder-zinc-600 transition"
                                      />
                                    </div>

                                    <button
                                      type="submit"
                                      disabled={contactStatus === "loading"}
                                      className="w-full py-3 bg-[#007acc] hover:bg-[#0062a3] text-white font-mono font-bold text-[14px] rounded flex items-center justify-center gap-2 cursor-pointer transition select-none disabled:bg-zinc-700 disabled:cursor-not-allowed"
                                    >
                                      {contactStatus === "loading"
                                        ? "mengirim..."
                                        : "→ send_message()"}
                                    </button>

                                    {contactStatus === "success" && (
                                      <span className="text-emerald-400 text-xs font-mono font-semibold flex items-center gap-1">
                                        <CheckCircle size={14} /> Pesan
                                        terkirim! Email akan masuk langsung ke
                                        inbox Anda.
                                      </span>
                                    )}
                                    {contactStatus === "error" && (
                                      <span className="text-rose-400 text-xs font-mono font-semibold">
                                        ❌ Mohon isi semua formulir bertanda
                                        bintang (*)!
                                      </span>
                                    )}
                                    {contactStatus === "api_error" && (
                                      <span className="text-rose-400 text-xs font-mono font-semibold">
                                        ❌ Gagal mengirim pesan. Silakan periksa
                                        kunci VITE_WEB3FORMS_ACCESS_KEY di file
                                        .env Anda.
                                      </span>
                                    )}
                                    {contactStatus === "connection_error" && (
                                      <span className="text-rose-400 text-xs font-mono font-semibold">
                                        ❌ Gagal mengirim! Terjadi kesalahan
                                        koneksi internet. Silakan coba lagi.
                                      </span>
                                    )}

                                    <span className="text-[#6a9955] text-[11px] font-mono mt-1.5 select-none">
                                      // Dibuat menggunakan Web3Forms, yang
                                      dimana akan diterima oleh email saya
                                    </span>
                                  </form>
                                </div>
                              </div>
                            </div>

                            <div></div>
                            <span className="text-syntax-tag">
                              &lt;/body&gt;
                            </span>
                          </div>
                          <div>
                            <span className="text-syntax-tag">
                              &lt;/html&gt;
                            </span>
                          </div>
                        </div>
                      )}

                      {activeTab === "Certificates.json" && (
                        <div className="text-zinc-300 w-full pb-8 font-mono select-text">
                          <div className="text-syntax-comment mb-2">
                            // Certificates.json - Sertifikasi & Penghargaan
                            Profesional
                          </div>
                          <div>
                            <span className="text-syntax-tag">&lt;html</span>{" "}
                            <span className="text-syntax-variable">lang</span>=
                            <span className="text-syntax-string">"id"</span>
                            <span className="text-syntax-tag">&gt;</span>
                          </div>
                          <div className="pl-4">
                            <span className="text-syntax-tag">
                              &lt;body&gt;
                            </span>
                            <div></div>
                            <div className="pl-4"></div>

                            {/* Indented visual cards content */}
                            <div className="pl-2 sm:pl-4 py-2 border-l border-[#333] my-2 font-sans select-text">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 select-text mb-8">
                                {CERTIFICATIONS_DATA.map((cert) => {
                                  return (
                                    <div
                                      key={cert.name}
                                      className="bg-[#252526]/30 border border-[#2d2d2d] rounded-lg p-5 flex flex-col justify-between hover:border-zinc-500 hover:bg-[#252526]/50 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)] transition-all duration-300 ease-out"
                                    >
                                      <div>
                                        <div className="flex items-center justify-end mb-4">
                                          <div className="flex items-center gap-2">
                                            {cert.image && (
                                              <>
                                                <button
                                                  onClick={() =>
                                                    openFile(cert.image)
                                                  }
                                                  className="px-2.5 py-1 border border-zinc-700 bg-[#1e1e1e] hover:bg-zinc-800 text-zinc-400 hover:text-white rounded text-[11px] font-mono flex items-center gap-1 transition cursor-pointer select-none"
                                                  title="Buka di Tab Editor"
                                                >
                                                  <span>Editor ↗</span>
                                                </button>
                                                <button
                                                  onClick={() =>
                                                    setActiveCertModal(cert)
                                                  }
                                                  className="px-2.5 py-1 border border-[#007acc]/30 bg-[#1e1e1e] hover:bg-[#007acc]/10 text-cyan-400 hover:text-white rounded text-[11px] font-mono flex items-center gap-1 transition cursor-pointer select-none"
                                                  title="Pratinjau Cepat"
                                                >
                                                  <span>Preview 👁️</span>
                                                </button>
                                              </>
                                            )}
                                          </div>
                                        </div>

                                        {/* Certificate Image Visual Thumbnail */}
                                        {cert.image ? (
                                          <div
                                            className="relative w-full h-44 bg-zinc-950 rounded-lg overflow-hidden border border-zinc-850 mb-4 flex items-center justify-center group/img cursor-pointer"
                                            onClick={() =>
                                              setActiveCertModal(cert)
                                            }
                                          >
                                            <img
                                              src={`/certificates/${cert.image}`}
                                              alt={cert.name}
                                              className="w-full h-full object-cover transition duration-300 group-hover/img:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-black/45 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center select-none">
                                              <span className="bg-black/70 border border-zinc-700 px-3 py-1.5 rounded-lg text-xs text-white flex items-center gap-1.5 font-mono font-semibold">
                                                🔍 pratinjau_cepat()
                                              </span>
                                            </div>
                                          </div>
                                        ) : (
                                          <div className="w-full h-44 bg-zinc-900/30 border border-zinc-800/80 rounded-lg flex flex-col justify-center items-center gap-2 mb-4 text-zinc-650 select-none">
                                            <Award
                                              size={36}
                                              className="opacity-25 text-amber-500"
                                            />
                                            <span className="text-xs font-mono tracking-widest uppercase">
                                              No Image Available
                                            </span>
                                          </div>
                                        )}

                                        <div
                                          className={`text-[10.5px] ${cert.categoryColor || "text-amber-500"} font-bold uppercase tracking-wider mb-1 font-mono`}
                                        >
                                          {cert.category}
                                        </div>
                                        <h3 className="text-white text-[20px] font-extrabold font-unbounded tracking-normal mb-2 leading-tight select-text">
                                          {cert.name}
                                        </h3>
                                        <div className="text-xs text-[#007acc] font-mono mb-2 font-semibold select-text">
                                          Diterbitkan oleh {cert.issuer}
                                        </div>
                                        <p className="text-[13px] text-zinc-400 leading-relaxed font-sans mb-4 text-justify select-text">
                                          {cert.desc}
                                        </p>
                                      </div>

                                      <div className="flex flex-wrap gap-1.5 font-mono select-none mt-2">
                                        {cert.skills.map((s) => (
                                          <span
                                            key={s}
                                            className="bg-[#1e1e1e] border border-zinc-800 text-zinc-400 text-[10.5px] px-2 py-0.5 rounded"
                                          >
                                            {s}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>

                            <div className="pl-4"></div>
                            <div></div>
                            <span className="text-syntax-tag">
                              &lt;/body&gt;
                            </span>
                          </div>
                          <div>
                            <span className="text-syntax-tag">
                              &lt;/html&gt;
                            </span>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 4. BOTTOM STATUS BAR */}
      <div className="relative h-6 bg-[#007acc] text-white flex items-center justify-between px-3 text-[12px] select-none z-30 shrink-0 font-sans">
        <div className="flex items-center gap-3">
          <span className="bg-[#0062a3] hover:bg-[#00528c] px-2 h-full flex items-center gap-1 cursor-pointer transition">
            <GitBranch size={12} />
            <span>main</span>
          </span>
          <span className="hover:bg-[#0062a3] px-2 h-full flex items-center gap-1 cursor-pointer transition">
            <RefreshCw size={11} />
            <span>Syncing</span>
          </span>
          <div className="hidden sm:flex items-center gap-2">
            <span className="flex items-center gap-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span>Developer Server Active</span>
            </span>
          </div>
        </div>

        {/* Center Watermark brand block */}
        <div className="absolute left-1/2 -translate-x-1/2 hidden lg:flex items-center gap-1.5 text-white/85 font-medium select-none text-[11px] font-sans">
          <span>© {new Date().getFullYear()} Ryan Ibnu Syahrani</span>
          <span className="text-white/40">|</span>
          <span className="text-[10px] bg-[#00528c] px-1.5 py-0.5 rounded font-mono font-semibold tracking-wider">
            PORTFOLIO v1.0.0
          </span>
        </div>

        <div className="flex items-center gap-3.5 h-full">
          <span className="hidden md:flex hover:bg-[#0062a3] px-2 h-full items-center transition cursor-pointer font-mono">
            Line 1, Col 1
          </span>
          <span className="hidden md:flex hover:bg-[#0062a3] px-2 h-full items-center transition cursor-pointer font-mono">
            Spaces: 2
          </span>
          <span className="hidden md:flex hover:bg-[#0062a3] px-2 h-full items-center transition cursor-pointer font-mono">
            UTF-8
          </span>
          <span className="hidden md:flex hover:bg-[#0062a3] px-2 h-full items-center transition cursor-pointer font-mono">
            TypeScript React
          </span>
          <span className="hover:bg-[#0062a3] px-2 h-full flex items-center gap-1 transition cursor-pointer">
            <Bell size={12} />
            <span>0</span>
          </span>
        </div>
      </div>

      {/* 5. INTERACTIVE CERTIFICATE LIGHTBOX MODAL OVERLAY */}
      <AnimatePresence>
        {activeCertModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveCertModal(null)}
            className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#1e1e1e] border border-zinc-800 rounded-xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.8)] max-w-4xl w-full flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="bg-[#252526] px-5 py-3.5 border-b border-zinc-800 flex items-center justify-between">
                <div>
                  <h3 className="text-white font-bold text-base flex items-center gap-2">
                    <Award size={18} className="text-amber-500" />
                    {activeCertModal.name}
                  </h3>
                  <p className="text-xs text-zinc-500 font-mono mt-0.5">
                    Diterbitkan oleh {activeCertModal.issuer}
                  </p>
                </div>
                <button
                  onClick={() => setActiveCertModal(null)}
                  className="p-1.5 hover:bg-zinc-800 rounded-full text-zinc-400 hover:text-white transition duration-150 cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Content / Image Display */}
              <div className="flex-grow bg-[#141414] overflow-auto flex items-center justify-center p-6 min-h-[300px]">
                <img
                  src={
                    activeCertModal.image.startsWith("projects/")
                      ? `/${activeCertModal.image}`
                      : `/certificates/${activeCertModal.image}`
                  }
                  alt={activeCertModal.name}
                  className="max-w-full max-h-[60vh] object-contain rounded shadow-2xl border border-zinc-800 bg-[#1e1e1e]"
                />
              </div>

              {/* Modal Footer */}
              <div className="bg-[#252526] px-5 py-3 border-t border-zinc-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs">
                <p className="text-zinc-500 font-sans max-w-xl">
                  {activeCertModal.desc}
                </p>
                <div className="flex gap-3 shrink-0 justify-end">
                  <button
                    onClick={() => {
                      openFile(activeCertModal.image);
                      setActiveCertModal(null);
                    }}
                    className="px-4 py-2 border border-zinc-700 bg-[#1e1e1e] hover:bg-zinc-800 text-zinc-300 rounded font-mono font-semibold transition cursor-pointer select-none"
                  >
                    Buka di Tab Editor ↗
                  </button>
                  <a
                    href={
                      activeCertModal.image.startsWith("projects/")
                        ? `/${activeCertModal.image}`
                        : `/certificates/${activeCertModal.image}`
                    }
                    download={activeCertModal.image}
                    className="px-4 py-2 bg-[#007acc] hover:bg-[#0062a3] text-white rounded font-sans font-bold transition flex items-center justify-center gap-1 cursor-pointer select-none"
                  >
                    Unduh Sertifikat ⬇
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
