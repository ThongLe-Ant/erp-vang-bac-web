import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import {
  BookDemoBand,
  Eyebrow,
  FEATURES_HREF,
  GuideRails,
  HEADING_STYLE,
  RailMarks,
  VbFooter,
  VbHeader,
} from "./vb-shared"

export const GUIDES_PATH = "/cam-nang"

export interface GuideSection {
  heading: string
  paragraphs: string[]
  bullets?: Array<{ title: string; detail: string }>
}

export interface GuideArticle {
  slug: string
  category: string
  readTime: string
  publishedAt: string
  title: string
  description: string
  heroImage: string
  heroAlt: string
  relatedFeatureId: string
  relatedFeatureName: string
  recommendedPlan: string
  keyTakeaways: string[]
  sections: GuideSection[]
}

export const GUIDES: ReadonlyArray<GuideArticle> = [
  {
    slug: "van-hanh-dai-ly-bac-tich-tru-phu-quy-btmh-ancarat",
    category: "Đại lý bạc tích trữ",
    readTime: "6 phút đọc",
    publishedAt: "2026-10-18",
    title:
      "Vận hành đại lý bạc tích trữ Phú Quý, Bảo Tín Mạnh Hải, Ancarat: Chống trượt giá & quản lý hợp đồng hẹn giao",
    description:
      "Quy trình bán bạc thỏi, bạc miếng 999 cho đại lý uỷ quyền: tự động đồng bộ giá theo nguồn, chống trượt giá đơn mua bán tại quầy, quản lý hợp đồng hẹn giao và nối đơn trực tiếp hệ thống Phú Quý.",
    heroImage: "/images/screens/dat-hang-phu-quy.jpg?v=3",
    heroAlt:
      "Màn hình đặt đơn kết nối trực tiếp hệ thống Phú Quý kèm chiết khấu đại lý và biên lợi nhuận",
    relatedFeatureId: "dat-hang-phu-quy",
    relatedFeatureName: "Đặt đơn & bán lại Phú Quý",
    recommendedPlan: "Professional",
    keyTakeaways: [
      "Tự động đồng bộ bảng giá mua vào - bán ra từ Phú Quý, Bảo Tín Mạnh Hải, Ancarat và giá bạc thế giới (XAG/USD).",
      "Giữ nguyên đơn giá lúc lập phiếu ở quầy POS để chống trượt giá đơn mua bán khi khách đang chuyển khoản.",
      "Quản lý hợp đồng bạc hẹn ngày nhận hàng, tiền đặt cọc, trả hàng từng phần và mua lại hợp đồng.",
      "Đẩy đơn đặt hàng (mã YD...K) và gom đơn khớp phiên bán lại (mã BYD...K) trực tiếp với Phú Quý.",
    ],
    sections: [
      {
        heading:
          "1. Bài toán biến động giá từng phút tại các đại lý bạc tích trữ",
        paragraphs: [
          "Khác với trang sức truyền thống có biên độ giá ổn định theo ngày, các sản phẩm bạc tích trữ (bạc miếng, bạc thỏi 999 bản vị 1 lượng, 5 lượng, 10 lượng, 1kg) của Phú Quý, Bảo Tín Mạnh Hải hay Ancarat biến động liên tục theo nhịp giá bạc thế giới (XAG/USD). Trong những phiên thị trường sôi động, bảng giá niêm yết có thể điều chỉnh từ 5 đến hơn 10 lần chỉ trong một buổi sáng.",
          "Nếu tiệm hoặc đại lý vẫn vận hành thủ công, nhân viên vừa tiếp khách vừa canh điện thoại xem giá hãng để sửa bảng giá và tính tiền bằng máy tính cầm tay, hai rủi ro lớn thường xuyên xảy ra: báo nhầm giá cũ khiến đại lý mất phần chiết khấu, hoặc bảng giá nhảy đúng lúc khách đang mở ứng dụng ngân hàng chuyển khoản dẫn đến lệch tiền tại quầy.",
        ],
        bullets: [
          {
            title: "Đồng bộ giá tự động đa nguồn",
            detail:
              "ERP Vàng Bạc tự động cập nhật giá mua - bán từ Phú Quý, Bảo Tín Mạnh Hải, Ancarat và đối chiếu biểu đồ XAG/USD theo thời gian thực cho toàn bộ chi nhánh.",
          },
          {
            title: "Chống trượt giá đơn mua bán tại quầy POS",
            detail:
              "Ngay khi thu ngân mở giỏ hàng tạo đơn, phần mềm giữ nguyên đơn giá của giao dịch đó. Dù bảng giá ngoài thị trường có nhảy trong lúc khách quét VietQR, đơn đã lập vẫn giữ đúng mức giá thoả thuận.",
          },
        ],
      },
      {
        heading:
          "2. Quản lý vòng đời hợp đồng bạc vật chất hẹn ngày giao & mua lại tại chỗ",
        paragraphs: [
          "Đặc thù lớn của mảng bạc tích trữ là lượng đơn đặt cọc hẹn ngày nhận hàng vật chất (sau 3–14 ngày) chiếm tỷ trọng cao. Quản lý bằng sổ giấy hoặc file Excel rời rạc khiến chủ đại lý dễ nhầm lẫn giữa khách đã thanh toán đủ 100%, khách mới đặt cọc một phần, hay khách đã lấy trước một phần hàng trong hợp đồng.",
          "Bên cạnh đó, nhiều khách hàng khi chưa tới ngày nhận bạc vật chất nhưng thấy giá bạc tăng sẽ muốn bán lại ngay trên hợp đồng đặt cọc để chốt lời.",
        ],
        bullets: [
          {
            title: "Theo dõi công nợ và lịch hẹn giao từng hợp đồng",
            detail:
              "Ghi nhận số hợp đồng, số tiền đã cọc, phần còn phải thu, ngày hẹn trả hàng và lịch sử xuất trả từng phần.",
          },
          {
            title: "Tất toán / mua lại hợp đồng ngay trên đơn gốc",
            detail:
              "Hỗ trợ thu mua lại toàn bộ hoặc một phần hợp đồng bạc theo giá niêm yết mới, tự động tính phần chênh lệch trả khách.",
          },
          {
            title: "Gửi tin nhắn Zalo OA (ZNS) chính thức",
            detail:
              "Khi khách vừa chốt hợp đồng hoặc khi bạc từ hãng về tới kho đại lý, hệ thống tự động gửi tin ZNS qua Zalo OA mời khách mang hợp đồng ra nhận.",
          },
        ],
      },
      {
        heading:
          "3. Nối thẳng đơn đặt hàng (YD...K) và khớp phiên bán lại (BYD...K) với Phú Quý",
        paragraphs: [
          "Đối với các đại lý uỷ quyền của Phú Quý, việc phải nhập đơn bán cho khách trên một phần mềm rồi lại mở cổng đại lý Phú Quý để gõ lại từng đơn đặt hàng vừa mất thời gian vừa dễ lệch số lượng. Khi khách bán lại bạc cho đại lý, việc gom các đơn lẻ để bán lại về Phú Quý cũng đòi hỏi đối soát chặt chẽ.",
        ],
        bullets: [
          {
            title: "Đẩy đơn đặt hàng trực tiếp & tính biên lãi",
            detail:
              "Nối thẳng đơn bán của khách (SO) sang đơn đặt Phú Quý (mã YD...K), tự động hiển thị chiết khấu đại lý và % biên lợi nhuận gộp của từng đơn.",
          },
          {
            title: "Gom đơn thu mua vào phiên bán lại Phú Quý",
            detail:
              "Theo dõi trạng thái các đơn thu mua từ khách (Chưa bán lại, Bán lại một phần, Đã bán lại đủ) và khớp tự động vào phiên bán lại nhận mã BYD...K từ Phú Quý.",
          },
        ],
      },
    ],
  },
  {
    slug: "quy-dinh-in-tem-nhan-vang-trang-suc-thong-tu-22",
    category: "Kim hoàn & pháp lý",
    readTime: "5 phút đọc",
    publishedAt: "2026-10-18",
    title:
      "Quy định in tem nhãn vàng bạc trang sức chuẩn Thông tư 22/2013/TT-BKHCN & in trực tiếp từ trình duyệt",
    description:
      "Các tiêu chuẩn bắt buộc trên tem nhãn vàng trang sức mỹ nghệ theo Thông tư 22 và cách in tem kim hoàn 2 cánh TSPL/ZPL trực tiếp qua Web Serial không cần phần mềm rời.",
    heroImage: "/images/screens/in-tem-kim-hoan.jpg?v=3",
    heroAlt:
      "Màn hình xem trước và in tem kim hoàn 2 cánh chuẩn Thông tư 22 trực tiếp từ trình duyệt",
    relatedFeatureId: "in-tem-kim-hoan",
    relatedFeatureName: "In tem kim hoàn Thông tư 22",
    recommendedPlan: "Professional",
    keyTakeaways: [
      "Đáp ứng đầy đủ thông số bắt buộc trên nhãn hàng hoá vàng trang sức, mỹ nghệ theo Thông tư 22/2013/TT-BKHCN.",
      "Chuẩn hoá bố cục tem kim hoàn 2 cánh (40mm × 10mm × 2) gồm cánh mã vạch và cánh thông tin trọng lượng, tuổi vàng, tiền công.",
      "In trực tiếp ra máy in tem TSPL/ZPL ngay từ trình duyệt web qua Web Serial mà không cần cài phần mềm thiết kế tem trung gian.",
      "Kết nối liền mạch với quy trình bán vàng theo tuổi (Khối lượng × Giá tuổi + Công + Đá) và thu mua cân trừ đá, trừ dơ.",
    ],
    sections: [
      {
        heading:
          "1. Thông tin bắt buộc trên tem nhãn vàng trang sức theo Thông tư 22",
        paragraphs: [
          "Trong hoạt động kiểm tra định kỳ của Quản lý thị trường và Chi cục Tiêu chuẩn Đo lường Chất lượng, việc ghi nhãn hàng hoá đối với vàng trang sức, mỹ nghệ theo Thông tư 22/2013/TT-BKHCN của Bộ Khoa học và Công nghệ là hạng mục được rà soát đầu tiên. Các tiệm vàng viết tem giấy bằng tay hoặc in tem thiếu thông số trọng lượng đá, trọng lượng vàng thuần rất dễ sai quy định.",
          "Mỗi sản phẩm vàng trang sức bày bán tại quầy cần có tem nhãn thể hiện rõ hàm lượng vàng (tuổi vàng), khối lượng vàng nguyên chất, khối lượng đá quý hoặc vật gắn kèm (nếu có), tiền công chế tác và ký hiệu của cơ sở kinh doanh.",
        ],
        bullets: [
          {
            title: "Tách bạch Khối lượng tổng – Khối lượng đá – Khối lượng vàng",
            detail:
              "Tem ghi rõ cân tổng (KL tổng), phần trọng lượng đá/hột (KL đá) và phần trọng lượng vàng thực tế dùng để tính tiền (KL vàng), đơn vị tính bằng chỉ/phân/ly hoặc gram.",
          },
          {
            title: "Hàm lượng vàng (Tuổi vàng) & Ký hiệu tiệm",
            detail:
              "Hiển thị tuổi vàng (9999, 999, 24K, 18K, 610, 14K, 10K, bạc 925), tiền công chế tác và tên tiệm vàng.",
          },
        ],
      },
      {
        heading:
          "2. Thay thế quy trình xuất file Excel sang phần mềm in tem rời",
        paragraphs: [
          "Trước đây, mỗi khi nhập lô hàng trang sức mới, nhân viên thường phải nhập danh sách vào file Excel, sau đó mở phần mềm thiết kế mã vạch rời trên máy tính Windows cố định để căn chỉnh rồi mới in. Khi đổi máy tính hoặc lệch cấu hình driver, khung tem rất dễ bị nhảy lệch mép.",
          "Trên ERP Vàng Bạc, trình sinh mã lệnh máy in TSPL và ZPL được tích hợp trực tiếp vào giao diện web.",
        ],
        bullets: [
          {
            title: "Xem trước trực quan tem 2 cánh trên màn hình",
            detail:
              "Kiểm tra bố cục cánh mã vạch và cánh thông tin (KL tổng, KL đá, KL vàng, tiền công, tuổi vàng, tên tiệm) trước khi bấm lệnh in.",
          },
          {
            title: "In trực tiếp qua Web Serial hoặc tải file .prn",
            detail:
              "Tương thích với các dòng máy in tem kim hoàn phổ biến (Godex, Zebra, Bixolon, Xprinter) ngay từ trình duyệt.",
          },
        ],
      },
      {
        heading:
          "3. Liên thông từ in tem nhập kho đến bán hàng & thu mua trừ đá, trừ dơ",
        paragraphs: [
          "Khi từng món trang sức trên khay trưng bày đã có tem mã vạch chuẩn, thao tác bán hàng và thu mua tại quầy được rút gọn trên một màn hình.",
        ],
        bullets: [
          {
            title: "Quét mã tính tiền theo bảng giá tuổi vàng đang chạy",
            detail:
              "Phần mềm tự lấy Khối lượng vàng thuần trên tem × Giá bán của tuổi vàng tương ứng + Tiền công + Tiền đá.",
          },
          {
            title: "Thu mua vàng cũ cân trừ đá, trừ dơ & đổi bù trên một phiếu",
            detail:
              "Khi khách bán vàng cũ hoặc đổi món mới, thu ngân nhập cân tổng, trừ đá, trừ dơ để ra vàng thuần nhân giá thu mua; phần mềm tự cấn trừ chênh lệch ngay trên cùng một đơn.",
          },
        ],
      },
    ],
  },
  {
    slug: "ket-noi-hoa-don-dien-tu-misa-amis-cho-tiem-vang-bac",
    category: "Kế toán & thuế",
    readTime: "5 phút đọc",
    publishedAt: "2026-10-18",
    title:
      "Đồng bộ phần mềm bán hàng tiệm vàng bạc với kế toán & hoá đơn điện tử MISA AMIS",
    description:
      "Tự động hoá quy trình đẩy chứng từ bán vàng bạc, thu mua, sổ quỹ và giá vốn thực tế từng đơn từ quầy POS sang MISA AMIS mà kế toán không phải gõ lại từng đơn.",
    heroImage: "/images/screens/lai-lo-tung-don.jpg?v=3",
    heroAlt:
      "Màn hình báo cáo lãi lỗ theo từng đơn và đối soát đồng bộ chứng từ sang MISA AMIS",
    relatedFeatureId: "bao-cao",
    relatedFeatureName: "Báo cáo lãi lỗ & MISA AMIS",
    recommendedPlan: "Professional",
    keyTakeaways: [
      "Loại bỏ việc kế toán phải gõ lại hàng trăm phiếu bán lẻ vàng bạc mỗi cuối tháng vào phần mềm kế toán.",
      "Tính lợi nhuận gộp theo giá vốn thực tế của từng đơn bán vàng trang sức và bạc tích trữ.",
      "Đồng bộ danh mục hàng hoá, khách hàng và chứng từ bán hàng, thu chi sang MISA AMIS kèm bảng đối soát chống đẩy trùng.",
      "Tự động gửi mã tra cứu hoá đơn điện tử MISA cho khách hàng qua tin nhắn Zalo OA (ZNS) ngay khi phát hành.",
    ],
    sections: [
      {
        heading:
          "1. Giải quyết việc nhập liệu lại chứng từ cuối tháng của kế toán tiệm vàng",
        paragraphs: [
          "Khi quy định về hoá đơn điện tử khởi tạo từ máy tính tiền và minh bạch sổ sách đối với ngành vàng bạc được áp dụng chặt chẽ, việc ghi phiếu tay rời rạc không còn phù hợp.",
          "Tuy nhiên, nếu dùng trực tiếp phần mềm kế toán tại quầy bán lẻ thì thu ngân thao tác rất chậm vì phần mềm kế toán không có cơ chế tự bắt giá vàng bạc nhảy theo phút, không có đồng hồ khoá giá POS và không xử lý công thức cân trừ đá, trừ dơ hay đổi bù trên cùng một giỏ hàng. Ngược lại, nếu dùng phần mềm bán hàng rời không có kết nối đồng bộ, cuối tháng kế toán phải nhập lại toàn bộ giao dịch sang MISA.",
        ],
        bullets: [
          {
            title: "Quầy bán hàng dùng POS chuyên biệt, kế toán làm việc trên MISA",
            detail:
              "Thu ngân thao tác trên giao diện POS ERP Vàng Bạc; toàn bộ chứng từ phát sinh được chuẩn hoá để đẩy sang MISA AMIS.",
          },
          {
            title: "Bảng đối soát chứng từ chống đẩy trùng",
            detail:
              "Kiểm tra trạng thái từng đơn đã đồng bộ sang MISA hay chưa, đối soát theo mã chứng từ để không bị trùng lặp dữ liệu.",
          },
        ],
      },
      {
        heading:
          "2. Kiểm soát lãi lỗ từng đơn theo giá vốn thực tế & kiểm quỹ mệnh giá cuối ca",
        paragraphs: [
          "Với biên lợi nhuận mỏng của mảng bạc tích trữ và vàng 9999, việc tính giá vốn bình quân cuối kỳ khiến chủ tiệm khó theo dõi đơn bán ở từng thời điểm trong ngày thực sự lãi bao nhiêu.",
        ],
        bullets: [
          {
            title: "Báo cáo lãi gộp trên từng đơn hàng",
            detail:
              "Đối chiếu trực tiếp doanh thu đơn bán với giá vốn thực tế (hoặc giá đặt đơn YD...K từ Phú Quý) để hiển thị tiền lãi và tỷ suất lợi nhuận từng đơn.",
          },
          {
            title: "Gạch nợ tự động VietQR & kiểm quỹ theo mệnh giá",
            detail:
              "Đơn chuyển khoản tự cập nhật khi ngân hàng báo có; tiền mặt cuối ca được kiểm đếm theo từng mệnh giá và đối chiếu trực tiếp với sổ quỹ.",
          },
        ],
      },
    ],
  },
  {
    slug: "quan-ly-cam-do-vang-bac-va-kiem-ke-kho-da-chi-nhanh",
    category: "Cầm đồ & đa chi nhánh",
    readTime: "6 phút đọc",
    publishedAt: "2026-10-18",
    title:
      "Quản lý hiệu cầm đồ vàng bạc, sơ đồ ô két tài sản & kiểm soát tồn kho đa chi nhánh",
    description:
      "Số hoá hợp đồng cầm đồ vàng bạc, tính lãi phí theo ngày thực tế, quản lý vị trí từng món cầm trong ô két sắt và điều chuyển hàng hoá giữa các chi nhánh.",
    heroImage: "/images/screens/o-luu-tai-san.jpg?v=3",
    heroAlt:
      "Sơ đồ ô lưu giữ tài sản cầm đồ theo khu và ngăn két tại từng chi nhánh",
    relatedFeatureId: "cam-do",
    relatedFeatureName: "Cầm đồ & kho tài sản cầm",
    recommendedPlan: "Business",
    keyTakeaways: [
      "Định giá món cầm theo bảng giá tuổi vàng tại thời điểm nhận cầm và kiểm soát hạn mức cầm tối đa.",
      "Tính lãi phí cầm đồ theo số ngày thực tế (làm tròn 1.000đ), tự động gửi Zalo OA nhắc khách trước ngày tới hạn chuộc.",
      "Quản lý sơ đồ ô két lưu giữ tài sản cầm theo từng chi nhánh: biết rõ món cầm của hợp đồng nào đang nằm ở ngăn két nào.",
      "Điều chuyển hàng hoá có xác nhận 2 đầu giữa Kho chính, Quầy trưng bày và các chi nhánh kèm kiểm kê định kỳ.",
    ],
    sections: [
      {
        heading:
          "1. Hợp đồng cầm đồ vàng bạc: Định giá theo tuổi vàng & tính lãi ngày thực tế",
        paragraphs: [
          "Tại các tiệm vàng kết hợp dịch vụ cầm đồ hoặc chuỗi hiệu cầm đồ, việc thẩm định giá trị món cầm và tính kỳ đóng lãi, gia hạn, chuộc đồ nếu ghi sổ tay rất dễ lệch số liệu giữa các ca trực.",
          "Trên phân hệ Cầm đồ của ERP Vàng Bạc, quy trình nhận cầm lấy trực tiếp bảng giá tuổi vàng đang chạy của tiệm để định giá tài sản.",
        ],
        bullets: [
          {
            title: "Định giá & kiểm soát hạn mức nhận cầm",
            detail:
              "Tự tính giá trị tài sản theo khối lượng và tuổi vàng hiện hành; nếu số tiền cầm vượt hạn mức cấu hình, hệ thống yêu cầu người quản lý duyệt.",
          },
          {
            title: "Gói lãi phí theo ngày & nhắc hạn qua Zalo",
            detail:
              "Khai báo gói lãi phí theo %/tháng và quy đổi ra số ngày thực tế khi khách đóng lãi, gia hạn hoặc chuộc. Trước ngày đến hạn, hệ thống tự gửi tin Zalo nhắc khách.",
          },
        ],
      },
      {
        heading:
          "2. Sơ đồ ô két tài sản cầm & điều chuyển kho liên chi nhánh",
        paragraphs: [
          "Khó khăn lớn của chủ hiệu cầm đồ và chuỗi tiệm vàng nhiều chi nhánh là khi kiểm kê phát hiện lệch số lượng nhưng không truy vết được món hàng đang nằm ở ngăn két nào, ngoài quầy trưng bày hay đang điều chuyển giữa các cơ sở.",
        ],
        bullets: [
          {
            title: "Gắn vị trí từng món cầm vào sơ đồ ô két",
            detail:
              "Mỗi hợp đồng cầm đồ sau khi niêm phong được xếp vào một ô lưu cụ thể trong kho của chi nhánh, theo dõi toàn bộ lịch sử ra vào.",
          },
          {
            title: "Tách kho chính, quầy trưng bày và chi nhánh",
            detail:
              "Mọi lệnh xuất hàng từ kho chính ra quầy trưng bày hoặc chuyển giữa các chi nhánh đều lập phiếu điều chuyển có xác nhận hai đầu.",
          },
        ],
      },
    ],
  },
] as const

export function getGuideBySlug(slug: string): GuideArticle | undefined {
  return GUIDES.find((g) => g.slug === slug)
}

export function VbGuidesIndexPage() {
  return (
    <div className="bg-vb-bg text-vb-fg selection:bg-vb-gold min-h-dvh antialiased selection:text-white">
      <VbHeader active="Cẩm nang" />

      <div>
        <div aria-hidden="true" className="h-[76px]" />
        <div className="relative overflow-x-clip">
          <GuideRails />

          {/* Đầu trang tối giản, cùng ngôn ngữ thiết kế với /chuc-nang */}
          <section className="border-vb-border relative border-b pt-12 pb-10 lg:pt-16 lg:pb-12">
            <RailMarks />
            <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8">
              <div className="max-w-2xl">
                <Eyebrow index="01">Cẩm nang vận hành</Eyebrow>
                <h1
                  className="text-vb-fg mt-2.5 font-semibold tracking-[-0.02em] [text-wrap:balance]"
                  style={HEADING_STYLE}
                >
                  Nghiệp vụ đại lý bạc tích trữ, kim hoàn truyền thống &amp; cầm
                  đồ
                </h1>
                <p className="text-vb-muted mt-2.5 text-sm leading-relaxed">
                  Tài liệu hướng dẫn quy trình vận hành thực tế tại quầy, chuẩn
                  hoá tem nhãn Thông tư 22 và đồng bộ kế toán MISA AMIS.
                </p>
              </div>
              <Link
                href="/ho-so-giai-phap"
                className="border-vb-border-strong bg-vb-card text-vb-body hover:border-vb-gold hover:text-vb-gold inline-flex shrink-0 items-center gap-1.5 rounded-md border px-4 py-2 font-mono text-xs font-semibold uppercase transition-[border-color,color,transform] duration-150 active:scale-[0.98]"
              >
                Bản tóm tắt giải pháp (In A4 / PDF)
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </section>

          {/* Danh sách bài viết kẻ khung kiến trúc (ăn khớp GuideRails) */}
          <section className="border-vb-border relative border-b">
            <RailMarks />
            <div className="divide-vb-border mx-auto max-w-6xl divide-y">
              {GUIDES.map((g, idx) => (
                <article
                  key={g.slug}
                  className="group grid grid-cols-1 gap-6 px-4 py-10 sm:px-6 lg:grid-cols-12 lg:items-start lg:gap-10 lg:px-8 lg:py-12"
                >
                  <div className="lg:col-span-3">
                    <p className="tnum text-vb-gold font-mono text-xs font-medium tracking-[0.06em] uppercase">
                      [{String(idx + 1).padStart(2, "0")}] · {g.category}
                    </p>
                    <p className="tnum text-vb-subtle mt-1 font-mono text-xs">
                      {g.readTime} · Gói {g.recommendedPlan}
                    </p>
                    <p className="text-vb-subtle mt-4 text-xs">
                      Phân hệ liên quan:{" "}
                      <Link
                        href={`${FEATURES_HREF}#${g.relatedFeatureId}`}
                        className="text-vb-body decoration-vb-border-strong hover:decoration-vb-gold font-medium underline underline-offset-4"
                      >
                        {g.relatedFeatureName}
                      </Link>
                    </p>
                  </div>

                  <div className="lg:col-span-5">
                    <h2 className="text-vb-fg text-xl leading-snug font-bold sm:text-2xl">
                      <Link
                        href={`${GUIDES_PATH}/${g.slug}`}
                        className="hover:text-vb-gold transition-colors"
                      >
                        {g.title}
                      </Link>
                    </h2>
                    <p className="text-vb-muted mt-2.5 text-sm leading-relaxed">
                      {g.description}
                    </p>
                    <div className="mt-4">
                      <Link
                        href={`${GUIDES_PATH}/${g.slug}`}
                        className="text-vb-gold inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase hover:underline"
                      >
                        Đọc bài hướng dẫn
                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
                      </Link>
                    </div>
                  </div>

                  <div className="lg:col-span-4">
                    <Link
                      href={`${GUIDES_PATH}/${g.slug}`}
                      className="border-vb-border-strong bg-vb-card group-hover:border-vb-gold block overflow-hidden rounded-lg border transition-colors"
                    >
                      <div className="border-vb-border bg-vb-surface flex h-6 items-center justify-between border-b px-2.5">
                        <div className="flex items-center gap-1">
                          <span className="bg-vb-border-strong h-2 w-2 rounded-full" />
                          <span className="bg-vb-border-strong h-2 w-2 rounded-full" />
                          <span className="bg-vb-border-strong h-2 w-2 rounded-full" />
                        </div>
                        <span className="tnum text-vb-subtle font-mono text-[10px]">
                          #{g.relatedFeatureId}
                        </span>
                      </div>
                      <Image
                        src={g.heroImage}
                        alt={g.heroAlt}
                        width={1440}
                        height={900}
                        sizes="(min-width: 1024px) 340px, 100vw"
                        className="block aspect-[16/10] w-full bg-white object-contain object-center"
                      />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <BookDemoBand />
        </div>
      </div>

      <VbFooter />
    </div>
  )
}

export function VbGuideDetailPage({ article }: { article: GuideArticle }) {
  const otherGuides = GUIDES.filter((g) => g.slug !== article.slug)

  return (
    <div className="bg-vb-bg text-vb-fg selection:bg-vb-gold min-h-dvh antialiased selection:text-white">
      <VbHeader active="Cẩm nang" />

      <div>
        <div aria-hidden="true" className="h-[76px]" />
        <div className="relative overflow-x-clip">
          <GuideRails />

          {/* Đầu bài viết chuẩn Editorial, ăn khớp khung max-w-6xl */}
          <header className="border-vb-border relative border-b pt-10 pb-10 lg:pt-14 lg:pb-12">
            <RailMarks />
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl">
                <p className="tnum text-vb-subtle font-mono text-xs">
                  <Link
                    href={GUIDES_PATH}
                    className="text-vb-gold font-medium hover:underline"
                  >
                    Cẩm nang
                  </Link>
                  {" / "}
                  <span>{article.category}</span>
                  {" · "}
                  <span>{article.readTime}</span>
                  {" · "}
                  <span>Cập nhật {article.publishedAt}</span>
                </p>

                <h1
                  className="text-vb-fg mt-3.5 font-semibold tracking-[-0.02em] [text-wrap:balance]"
                  style={HEADING_STYLE}
                >
                  {article.title}
                </h1>

                <p className="text-vb-muted mt-3 max-w-3xl text-base leading-relaxed">
                  {article.description}
                </p>
              </div>
            </div>
          </header>

          {/* Nội dung bài viết: Bố cục 2 cột Editorial (8 cột nội dung + 4 cột mục lục dính) */}
          <article className="border-vb-border relative border-b py-10 lg:py-14">
            <RailMarks />
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:items-start lg:gap-12 lg:px-8">
              {/* Cột đọc chính (8/12) */}
              <div className="lg:col-span-8">
                <figure className="border-vb-border-strong bg-vb-card overflow-hidden rounded-lg border">
                  <div className="border-vb-border bg-vb-surface flex h-8 items-center justify-between border-b px-3">
                    <div className="flex items-center gap-1.5">
                      <span className="bg-vb-border-strong h-2.5 w-2.5 rounded-full" />
                      <span className="bg-vb-border-strong h-2.5 w-2.5 rounded-full" />
                      <span className="bg-vb-border-strong h-2.5 w-2.5 rounded-full" />
                    </div>
                    <span className="tnum text-vb-subtle font-mono text-[11px]">
                      erp.vangbac.goplus.vn · #{article.relatedFeatureId}
                    </span>
                  </div>
                  <Image
                    src={article.heroImage}
                    alt={article.heroAlt}
                    width={1440}
                    height={900}
                    priority
                    sizes="(min-width: 1024px) 768px, 100vw"
                    className="block aspect-[16/10] w-full bg-white object-contain object-center"
                  />
                  <figcaption className="border-vb-border bg-vb-surface text-vb-subtle border-t px-4 py-2.5 text-xs">
                    {article.heroAlt}
                  </figcaption>
                </figure>

                {/* Hộp Tóm tắt cốt lõi phẳng 1px (tránh Sin #5: thẻ bo góc kèm viền trái màu) */}
                <div className="border-vb-border bg-vb-surface/65 mt-8 border">
                  <div className="border-vb-border flex items-center justify-between border-b px-5 py-2.5">
                    <span className="tnum text-vb-gold font-mono text-xs font-semibold tracking-[0.06em] uppercase">
                      Tóm tắt cốt lõi
                    </span>
                    <span className="tnum text-vb-subtle font-mono text-xs">
                      {article.keyTakeaways.length} điểm chính
                    </span>
                  </div>
                  <ul className="divide-vb-border text-vb-body divide-y px-5 text-sm leading-relaxed">
                    {article.keyTakeaways.map((point, idx) => (
                      <li key={point} className="flex items-start gap-3 py-3">
                        <span className="tnum text-vb-gold mt-0.5 font-mono text-xs font-semibold">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-10 space-y-11">
                  {article.sections.map((sec, idx) => (
                    <section
                      key={sec.heading}
                      id={`muc-${idx + 1}`}
                      className="scroll-mt-24 space-y-3.5"
                    >
                      <h2 className="text-vb-fg text-xl leading-snug font-bold sm:text-2xl">
                        {sec.heading}
                      </h2>
                      {sec.paragraphs.map((p) => (
                        <p
                          key={p}
                          className="text-vb-body max-w-[68ch] text-[15px] leading-relaxed"
                        >
                          {p}
                        </p>
                      ))}
                      {sec.bullets && (
                        <dl className="border-vb-border divide-vb-border bg-vb-surface/40 mt-4 divide-y border px-5">
                          {sec.bullets.map((b) => (
                            <div key={b.title} className="py-3.5">
                              <dt className="text-vb-fg text-sm font-semibold">
                                {b.title}
                              </dt>
                              <dd className="text-vb-muted mt-1 text-sm leading-relaxed">
                                {b.detail}
                              </dd>
                            </div>
                          ))}
                        </dl>
                      )}
                    </section>
                  ))}
                </div>
              </div>

              {/* Cột bên phải dính (4/12): Mục lục & Thẻ chuyển đổi phân hệ */}
              <aside className="space-y-5 lg:sticky lg:top-24 lg:col-span-4">
                <nav
                  aria-label="Mục lục bài viết"
                  className="border-vb-border bg-vb-surface/60 rounded-lg border p-5"
                >
                  <p className="text-vb-subtle font-mono text-[11px] font-semibold tracking-[0.08em] uppercase">
                    Trên trang này
                  </p>
                  <ol className="mt-3 space-y-2.5 text-sm">
                    {article.sections.map((sec, idx) => (
                      <li key={sec.heading}>
                        <a
                          href={`#muc-${idx + 1}`}
                          className="text-vb-muted hover:text-vb-gold flex items-start gap-2 leading-snug transition-colors"
                        >
                          <span className="tnum text-vb-subtle mt-0.5 font-mono text-xs">
                            0{idx + 1}
                          </span>
                          <span>
                            {sec.heading.replace(/^\d+\.\s*/, "")}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>

                <div className="border-vb-border-strong bg-vb-card rounded-lg border p-5">
                  <p className="text-vb-gold font-mono text-[11px] font-semibold tracking-[0.08em] uppercase">
                    Phân hệ áp dụng trực tiếp
                  </p>
                  <h3 className="text-vb-fg mt-1.5 text-base font-bold">
                    {article.relatedFeatureName}
                  </h3>
                  <p className="text-vb-subtle mt-1 text-xs leading-relaxed">
                    Có sẵn từ gói{" "}
                    <b className="text-vb-body font-semibold">
                      {article.recommendedPlan}
                    </b>{" "}
                    trên nền tảng ERP Vàng Bạc.
                  </p>
                  <div className="mt-4 flex flex-col gap-2">
                    <Link
                      href={`${FEATURES_HREF}#${article.relatedFeatureId}`}
                      className="bg-vb-fg text-vb-bg inline-flex min-h-[40px] items-center justify-center gap-1.5 rounded-md px-4 py-2 text-xs font-semibold transition-[opacity,transform] duration-150 hover:opacity-88 active:scale-[0.98]"
                    >
                      Xem màn hình chức năng
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                    <Link
                      href="/#dang-ky"
                      className="border-vb-border-strong text-vb-body hover:border-vb-gold inline-flex min-h-[40px] items-center justify-center rounded-md border px-4 py-2 text-xs font-semibold transition-[border-color,color,transform] duration-150 active:scale-[0.98]"
                    >
                      Đặt lịch demo theo quy trình này
                    </Link>
                  </div>
                </div>
              </aside>
            </div>
          </article>

          {/* Bài viết khác */}
          <section className="border-vb-border relative border-b py-12 lg:py-14">
            <RailMarks />
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <Eyebrow>Bài viết khác</Eyebrow>
              <div className="border-vb-border divide-vb-border mt-6 grid grid-cols-1 divide-y border-t lg:grid-cols-3 lg:divide-x lg:divide-y-0">
                {otherGuides.map((g, i) => (
                  <Link
                    key={g.slug}
                    href={`${GUIDES_PATH}/${g.slug}`}
                    className={`group block py-6 ${
                      i === 0
                        ? "lg:pr-6"
                        : i === 1
                          ? "lg:px-6"
                          : "lg:pl-6"
                    }`}
                  >
                    <p className="tnum text-vb-subtle font-mono text-xs">
                      {g.category} · {g.readTime}
                    </p>
                    <h3 className="text-vb-fg group-hover:text-vb-gold mt-2 text-base leading-snug font-bold transition-colors">
                      {g.title}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <BookDemoBand />
        </div>
      </div>

      <VbFooter />
    </div>
  )
}
