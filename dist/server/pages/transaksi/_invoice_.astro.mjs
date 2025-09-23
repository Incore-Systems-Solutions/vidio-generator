import { e as createComponent, f as createAstro, l as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_DLHOh8jC.mjs';
import 'kleur/colors';
import { $ as $$Main } from '../../chunks/main_C8Zn-fhb.mjs';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { B as Button, C as Card, a as CardHeader, b as CardTitle, c as CardContent, d as Badge, N as Navbar } from '../../chunks/card_BBwcWowj.mjs';
import { RefreshCw, AlertCircle, ArrowLeft, CreditCard, DollarSign, FileText, ExternalLink, Video, User, Mail, Phone, XCircle, Clock, CheckCircle } from 'lucide-react';
import { t as transactionApi } from '../../chunks/api_Zi8Etrro.mjs';
import { v as videoSetupStorage } from '../../chunks/videoSetupStorage_3qmsD2TP.mjs';
export { renderers } from '../../renderers.mjs';

function TransactionDetail({
  invoiceNumber,
  onBack
}) {
  const [transaction, setTransaction] = useState(null);
  const [videoData, setVideoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const fetchTransaction = async () => {
    try {
      setError(null);
      const response = await transactionApi.getTransaction(invoiceNumber);
      if (response.status) {
        setTransaction(response.data);
      } else {
        throw new Error(response.message || "Failed to fetch transaction");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch transaction"
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };
  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchTransaction();
  };
  useEffect(() => {
    fetchTransaction();
    const storedVideoData = videoSetupStorage.load();
    setVideoData(storedVideoData);
  }, [invoiceNumber]);
  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case "success":
      case "paid":
        return /* @__PURE__ */ jsx(CheckCircle, { className: "w-5 h-5 text-green-600" });
      case "pending":
        return /* @__PURE__ */ jsx(Clock, { className: "w-5 h-5 text-yellow-600" });
      case "failed":
      case "expired":
        return /* @__PURE__ */ jsx(XCircle, { className: "w-5 h-5 text-red-600" });
      default:
        return /* @__PURE__ */ jsx(AlertCircle, { className: "w-5 h-5 text-gray-600" });
    }
  };
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "success":
      case "paid":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "failed":
      case "expired":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };
  const getStatusText = (status) => {
    switch (status.toLowerCase()) {
      case "success":
      case "paid":
        return "Pembayaran Berhasil";
      case "pending":
        return "Menunggu Pembayaran";
      case "failed":
        return "Pembayaran Gagal";
      case "expired":
        return "Pembayaran Kedaluwarsa";
      default:
        return status;
    }
  };
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0
    }).format(amount);
  };
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "w-full", children: /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center min-h-[400px]", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
      /* @__PURE__ */ jsx(RefreshCw, { className: "w-5 h-5 animate-spin" }),
      /* @__PURE__ */ jsx("span", { children: "Memuat detail transaksi..." })
    ] }) }) });
  }
  if (error) {
    return /* @__PURE__ */ jsx("div", { className: "w-full", children: /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center min-h-[400px]", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx(AlertCircle, { className: "w-12 h-12 text-red-500 mx-auto mb-4" }),
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-foreground mb-2", children: "Gagal Memuat Transaksi" }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mb-4", children: error }),
      /* @__PURE__ */ jsx(Button, { onClick: handleRefresh, disabled: refreshing, children: refreshing ? /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(RefreshCw, { className: "w-4 h-4 mr-2 animate-spin" }),
        "Memuat..."
      ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(RefreshCw, { className: "w-4 h-4 mr-2" }),
        "Coba Lagi"
      ] }) })
    ] }) }) });
  }
  if (!transaction) {
    return /* @__PURE__ */ jsx("div", { className: "w-full", children: /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center min-h-[400px]", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx(AlertCircle, { className: "w-12 h-12 text-gray-500 mx-auto mb-4" }),
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-foreground mb-2", children: "Transaksi Tidak Ditemukan" }),
      /* @__PURE__ */ jsxs("p", { className: "text-muted-foreground", children: [
        "Transaksi dengan nomor ",
        invoiceNumber,
        " tidak ditemukan."
      ] })
    ] }) }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4", children: [
        onBack && /* @__PURE__ */ jsxs(Button, { variant: "outline", size: "sm", onClick: onBack, children: [
          /* @__PURE__ */ jsx(ArrowLeft, { className: "w-4 h-4 mr-2" }),
          "Kembali"
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold text-foreground", children: "Detail Transaksi" }),
          /* @__PURE__ */ jsxs("p", { className: "text-muted-foreground", children: [
            "Invoice: ",
            transaction.invoice_number
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(
        Button,
        {
          variant: "outline",
          size: "sm",
          onClick: handleRefresh,
          disabled: refreshing,
          children: [
            /* @__PURE__ */ jsx(
              RefreshCw,
              {
                className: `w-4 h-4 mr-2 ${refreshing ? "animate-spin" : ""}`
              }
            ),
            "Refresh"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxs(Card, { children: [
          /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ jsx(CreditCard, { className: "w-5 h-5" }),
            /* @__PURE__ */ jsx("span", { children: "Status Transaksi" })
          ] }) }),
          /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
              getStatusIcon(transaction.transaction_status),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "font-semibold text-foreground", children: getStatusText(transaction.transaction_status) }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: transaction.status_ref })
              ] })
            ] }),
            /* @__PURE__ */ jsx(
              Badge,
              {
                className: getStatusColor(transaction.transaction_status),
                children: transaction.transaction_status.toUpperCase()
              }
            )
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs(Card, { children: [
          /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ jsx(DollarSign, { className: "w-5 h-5" }),
            /* @__PURE__ */ jsx("span", { children: "Informasi Pembayaran" })
          ] }) }),
          /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Total Pembayaran" }),
                /* @__PURE__ */ jsx("p", { className: "font-semibold text-lg text-foreground", children: formatCurrency(transaction.total_payment) })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Subtotal" }),
                /* @__PURE__ */ jsx("p", { className: "font-semibold text-foreground", children: formatCurrency(transaction.subtotal) })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Biaya Admin" }),
                /* @__PURE__ */ jsx("p", { className: "font-semibold text-foreground", children: formatCurrency(transaction.total_fee) })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Diskon" }),
                /* @__PURE__ */ jsxs("p", { className: "font-semibold text-foreground", children: [
                  "-",
                  formatCurrency(transaction.promo)
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "pt-4 border-t", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsx("span", { className: "text-sm text-muted-foreground", children: "Metode Pembayaran" }),
              /* @__PURE__ */ jsx(Badge, { variant: "outline", children: transaction.payment_type })
            ] }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(Card, { children: [
          /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ jsx(FileText, { className: "w-5 h-5" }),
            /* @__PURE__ */ jsx("span", { children: "Detail Transaksi" })
          ] }) }),
          /* @__PURE__ */ jsxs(CardContent, { className: "space-y-3", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Order ID" }),
              /* @__PURE__ */ jsx("span", { className: "font-medium", children: transaction.order_id })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Tanggal Transaksi" }),
              /* @__PURE__ */ jsx("span", { className: "font-medium", children: formatDate(transaction.created_at) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Kedaluwarsa" }),
              /* @__PURE__ */ jsx("span", { className: "font-medium", children: formatDate(transaction.transaction_expired) })
            ] }),
            transaction.payment_url && /* @__PURE__ */ jsx("div", { className: "pt-3 border-t", children: /* @__PURE__ */ jsxs(
              Button,
              {
                variant: "outline",
                size: "sm",
                className: "w-full",
                onClick: () => {
                  const popup = window.open(
                    transaction.payment_url,
                    "payment",
                    "width=800,height=600,scrollbars=yes,resizable=yes,menubar=no,toolbar=no,location=no,status=no"
                  );
                  if (popup) {
                    popup.focus();
                  }
                },
                children: [
                  /* @__PURE__ */ jsx(ExternalLink, { className: "w-4 h-4 mr-2" }),
                  "Buka Halaman Pembayaran"
                ]
              }
            ) }),
            transaction.transaction_status === "success" && /* @__PURE__ */ jsx("div", { className: "pt-3 border-t", children: /* @__PURE__ */ jsxs(
              Button,
              {
                size: "sm",
                className: "w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700",
                onClick: () => {
                  window.location.href = "/generate";
                },
                children: [
                  /* @__PURE__ */ jsx(Video, { className: "w-4 h-4 mr-2" }),
                  "Generate Video"
                ]
              }
            ) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxs(Card, { children: [
          /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ jsx(Video, { className: "w-5 h-5" }),
            /* @__PURE__ */ jsx("span", { children: "Detail Video" })
          ] }) }),
          /* @__PURE__ */ jsx(CardContent, { className: "space-y-4", children: videoData ? /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Judul Video" }),
              /* @__PURE__ */ jsx("p", { className: "font-semibold text-foreground", children: videoData.judul_video || "Tidak ada judul" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Prompt" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-foreground bg-gray-50 dark:bg-gray-800 p-3 rounded-lg", children: videoData.prompt || "Tidak ada prompt" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Aspek Rasio" }),
                /* @__PURE__ */ jsx(Badge, { variant: "outline", children: videoData.aspek_rasio })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Bahasa" }),
                /* @__PURE__ */ jsx(Badge, { variant: "outline", children: videoData.bahasa })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Gaya Suara" }),
                /* @__PURE__ */ jsx(Badge, { variant: "outline", children: videoData.gaya_suara })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Tone" }),
                /* @__PURE__ */ jsx(Badge, { variant: "outline", children: videoData.tone })
              ] })
            ] })
          ] }) : /* @__PURE__ */ jsxs("div", { className: "text-center py-8", children: [
            /* @__PURE__ */ jsx(AlertCircle, { className: "w-8 h-8 text-gray-400 mx-auto mb-2" }),
            /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Data video tidak tersedia" })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs(Card, { children: [
          /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ jsx(User, { className: "w-5 h-5" }),
            /* @__PURE__ */ jsx("span", { children: "Informasi Pelanggan" })
          ] }) }),
          /* @__PURE__ */ jsx(CardContent, { className: "space-y-3", children: videoData ? /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
              /* @__PURE__ */ jsx(Mail, { className: "w-4 h-4 text-muted-foreground" }),
              /* @__PURE__ */ jsx("span", { className: "text-sm", children: videoData.email || "Tidak ada email" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
              /* @__PURE__ */ jsx(Phone, { className: "w-4 h-4 text-muted-foreground" }),
              /* @__PURE__ */ jsx("span", { className: "text-sm", children: videoData.no_wa || "Tidak ada nomor telepon" })
            ] })
          ] }) : /* @__PURE__ */ jsx("div", { className: "text-center py-4", children: /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Data pelanggan tidak tersedia" }) }) })
        ] })
      ] })
    ] })
  ] });
}

const $$Astro = createAstro();
const prerender = false;
async function getStaticPaths() {
  return [];
}
const $$invoice = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$invoice;
  return renderTemplate`${renderComponent($$result, "Layout", $$Main, { "content": { title: "Detail Transaksi" } }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="min-h-screen bg-background"> <div class="container mx-auto px-4 py-8"> ${renderComponent($$result2, "Navbar", Navbar, { "currentStep": 2 })} <div class="max-w-7xl mx-auto mt-8"> ${renderComponent($$result2, "TransactionDetail", TransactionDetail, { "invoiceNumber": Astro2.params.invoice || "", "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/TransactionDetail", "client:component-export": "TransactionDetail" })} </div> </div> <footer class="bg-muted/50 border-t"> <div class="container mx-auto px-4 py-6"> <div class="text-center text-muted-foreground"> <p>&copy; 2025 Video Generator. All rights reserved.</p> </div> </div> </footer> </main> ` })}`;
}, "C:/Users/Mrian07/Documents/BACKUP-E/KERJA/vidio-generator/src/pages/transaksi/[invoice].astro", void 0);

const $$file = "C:/Users/Mrian07/Documents/BACKUP-E/KERJA/vidio-generator/src/pages/transaksi/[invoice].astro";
const $$url = "/transaksi/[invoice]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$invoice,
  file: $$file,
  getStaticPaths,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
