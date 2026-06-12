import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const dummyReports = [
  {
    id: 1,
    title: "Printer Rusak",
    description:
      "Printer di lantai 3 tidak dapat digunakan karena selalu menampilkan pesan error saat mencetak dokumen.",
    category: "BUG",
    status: "PENDING",
    createdAt: "11 Jun 2026",
  },
  {
    id: 2,
    title: "Dark Mode",
    description:
      "Menambahkan fitur dark mode pada aplikasi untuk meningkatkan kenyamanan pengguna saat bekerja di malam hari.",
    category: "FEATURE",
    status: "APPROVED",
    createdAt: "10 Jun 2026",
  },
  {
    id: 3,
    title: "Internet Lambat",
    description:
      "Koneksi internet di ruang operasional sering mengalami penurunan kecepatan sehingga menghambat pekerjaan tim.",
    category: "COMPLAINT",
    status: "REJECTED",
    createdAt: "09 Jun 2026",
  },
  {
    id: 4,
    title: "AC Ruang Server",
    description:
      "AC pada ruang server perlu dilakukan pengecekan dan perawatan berkala karena suhu ruangan mulai meningkat.",
    category: "MAINTENANCE",
    status: "PENDING",
    createdAt: "08 Jun 2026",
  },
];

function DialogReport({ selectedReport }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">View</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{selectedReport.title}</DialogTitle>
          <div>
            <Badge variant={"secondary"}>{selectedReport.category}</Badge>
            <Badge>{selectedReport.status}</Badge>
          </div>
          <DialogDescription>{selectedReport.description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <p className="text-sm text-muted-foreground">
            {selectedReport.createdAt}
          </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function ReportListPage() {
  return (
    <div className="mx-auto max-w-3xl p-4 space-y-6">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">My Reports</h2>
          <Button>Create Report</Button>
        </div>

        <input
          type="text"
          placeholder="Search Reports..."
          className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="space-y-4">
        {dummyReports.map((report) => (
          <div
            key={report.id}
            className="border rounded-lg p-4 space-y-3 bg-card shadow-sm"
          >
            <h3 className="font-semibold text-lg">{report.title}</h3>

            <div className="flex gap-2">
              <Badge variant="secondary">{report.category}</Badge>
              <Badge variant="default">{report.status}</Badge>
            </div>

            <div className="flex justify-between items-center pt-2">
              <p className="text-sm text-muted-foreground">
                {report.createdAt}
              </p>
              <DialogReport selectedReport={report} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
