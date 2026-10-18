import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  Clock,
  FileText,
  MessageCircle,
} from "lucide-react"

import {
  BOOK_DEMO_HREF,
  BookDemoBand,
  CONTACT,
  CubeBackdrop,
  Eyebrow,
  FEATURES_HREF,
  GuideRails,
  HEADING_STYLE,
  PLANS,
  RailMarks,
  SoftGlow,
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
    category: "Đại lý Bạc tích trữ",
    readTime: "6 phút đọc",
    publishedAt: "2026-10-18",
    title:
      "Quy trình vận hành đại lý bạc tích trữ Phú Quý, Bảo Tín Mạnh Hải, Ancarat: Chống trượt giá & quản lý hợp đồng hẹn giao",
    description:
      "Hướng dẫn chuẩn hoá quy trình bán bạc thỏi, bạc miếng 999 cho đại lý uỷ quyền: tự động bắt giá theo nguồn, khoá giá chống trượt tại POS, quản lý hợp đồng hẹn giao và nối đơn trực tiếp hệ thống Phú Quý.",
    heroImage: "/images/screens/dat-hang-phu-quy.jpg?v=3",
    heroAlt:
      "Màn hình đặt đơn kết nối trực tiếp hệ thống Phú Quý kèm chiết khấu đại lý và biên lợi nhuận",
    relatedFeatureId: "dat-hang-phu-quy",
    relatedFeatureName: "Đặt đơn & bán lại Phú Quý",
    recommendedPlan: "Professional (5.000.000đ/tháng)",
    keyTakeaways: [
      "Tự động đồng bộ bảng giá mua vào – bán ra từ Phú Quý, Bảo Tín Mạnh Hải, Ancarat và giá bạc thế giới (XAG/USD).",
      "Khoá cứng đơn giá ngay tại giây bấm tạo đơn ở quầy POS để triệt tiêu rủi ro trượt giá khi khách đang chuyển khoản.",
      "Quản lý chặt chẽ hợp đồng bạc vật chất hẹn ngày nhận hàng, tiền đặt cọc, trả hàng từng phần và mua lại hợp đồng.",
      "Kết nối đẩy đơn đặt hàng (mã YD...K) và gom đơn khớp phiên bán lại chốt lời (mã BYD...K) trực tiếp với Phú Quý.",
    ],
    sections: [
      {
        heading:
          "1. Bài toán biến động giá từng phút tại các đại lý bạc tích trữ",
        paragraphs: [
          "Khác với trang sức truyền thống có biên độ giá ổn định theo ngày, các sản phẩm bạc tích trữ (bạc miếng, bạc thỏi 999 bản vị 1 lượng, 5 lượng, 10 lượng, 1kg) của Phú Quý, Bảo Tín Mạnh Hải hay Ancarat biến động liên tục theo nhịp giá bạc thế giới (XAG/USD). Trong những phiên thị trường sôi động, bảng giá niêm yết có thể điều chỉnh từ 5 đến hơn 10 lần chỉ trong một buổi sáng.",
          "Nếu tiệm hoặc đại lý vẫn vận hành theo cách thủ công — nhân viên vừa tiếp khách vừa canh điện thoại xem giá hãng để sửa bảng giá và tính tiền bằng máy tính cầm tay — hai rủi ro lớn chắc chắn sẽ xảy ra: một là báo nhầm giá cũ khiến đại lý mất trắng phần chiết khấu, hai là bảng giá nhảy đúng lúc khách đang mở ứng dụng ngân hàng chuyển khoản dẫn đến tranh cãi tại quầy.",
        ],
        bullets: [
          {
            title: "Đồng bộ giá tự động đa nguồn",
            detail:
              "ERP Vàng Bạc tự động cập nhật giá mua – bán từ Phú Quý, Bảo Tín Mạnh Hải, Ancarat và đối chiếu biểu đồ XAG/USD theo thời gian thực cho toàn bộ chi nhánh.",
          },
          {
            title: "Đồng hồ khoá giá chống trượt tại POS",
            detail:
              "Ngay giây thu ngân mở giỏ hàng tạo đơn, hệ thống khoá cứng đơn giá của phiên giao dịch đó. Dù bảng giá ngoài thị trường có nhảy trong lúc khách quét VietQR, đơn đã chốt vẫn giữ nguyên mức giá thoả thuận.",
          },
        ],
      },
      {
        heading:
          "2. Quản lý vòng đời Hợp đồng bạc vật chất hẹn ngày giao & Mua lại tại chỗ",
        paragraphs: [
          "Đặc thù lớn nhất của mảng bạc tích trữ là lượng đơn đặt cọc hẹn ngày nhận hàng vật chất (sau 3–14 ngày) chiếm tỷ trọng rất cao. Quản lý bằng sổ giấy hoặc file Excel rời rạc khiến chủ đại lý rất dễ nhầm lẫn giữa khách đã thanh toán đủ 100%, khách mới đặt cọc một phần, hay khách đã lấy trước 2 lượng trong hợp đồng 10 lượng.",
          "Hơn nữa, nhiều khách hàng khi chưa tới ngày nhận bạc vật chất nhưng thấy giá bạc tăng mạnh sẽ muốn bán lại ngay trên hợp đồng đặt cọc để chốt lời.",
        ],
        bullets: [
          {
            title: "Theo dõi công nợ và lịch hẹn giao từng hợp đồng",
            detail:
              "Ghi nhận rõ số hợp đồng, số tiền đã cọc, phần còn phải thu, ngày hẹn trả hàng và lịch sử xuất trả từng phần.",
          },
          {
            title: "Tất toán / Mua lại hợp đồng ngay trên đơn gốc",
            detail:
              "Hỗ trợ thu mua lại toàn bộ hoặc một phần hợp đồng bạc theo giá niêm yết mới, tự động tính phần chênh lệch trả khách.",
          },
          {
            title: "Gửi tin nhắn Zalo OA (ZNS) chính danh",
            detail:
              "Khi khách vừa chốt hợp đồng hoặc khi bạc từ hãng về tới kho đại lý, hệ thống tự động gửi tin ZNS qua Zalo OA chính thức mời khách mang hợp đồng ra nhận.",
          },
        ],
      },
      {
        heading:
          "3. Nối thẳng đơn đặt hàng (YD...K) và khớp phiên bán lại (BYD...K) với Phú Quý",
        paragraphs: [
          "Đối với các đại lý uỷ quyền của Phú Quý, việc phải nhập đơn bán cho khách trên một phần mềm rồi lại mở cổng đại lý Phú Quý để gõ lại từng đơn đặt hàng vừa tốn thời gian vừa dễ lệch số lượng. Khi khách bán lại bạc cho đại lý, việc gom các đơn lẻ để xả hàng chốt lời về Phú Quý cũng đòi hỏi đối soát chặt chẽ.",
        ],
        bullets: [
          {
            title: "Đẩy đơn đặt hàng trực tiếp & tính ngay biên lãi",
            detail:
              "Nối thẳng đơn bán của khách (SO) sang đơn đặt Phú Quý (mã YD...K), tự động hiển thị chiết khấu đại lý và % biên lợi nhuận gộp của từng đơn.",
          },
          {
            title: "Gom đơn thu mua vào phiên bán lại Phú Quý",
            detail:
              "Theo dõi trạng thái các đơn thu mua từ khách (Chưa bán lại, Bán lại một phần, Đã bán lại đủ) và khớp tự động vào phiên bán lại nhận mã BYD...K từ Phú Quý.",
          },
          {
            title: "Tự động xuất ảnh bảng giá cập nhật nhóm Zalo",
            detail:
              "Mỗi khi giá hãng thay đổi, máy chủ tự dựng ảnh PNG bảng giá sắc nét mang thương hiệu đại lý và cập nhật tức thì vào các nhóm Zalo khách sỉ/lẻ.",
          },
        ],
      },
    ],
  },
  {
    slug: "quy-dinh-in-tem-nhan-vang-trang-suc-thong-tu-22",
    category: "Kim hoàn & Pháp lý",
    readTime: "5 phút đọc",
    publishedAt: "2026-10-18",
    title:
      "Quy định in tem nhãn vàng bạc trang sức chuẩn Thông tư 22/2013/TT-BKHCN & cách in tem 2 cánh trực tiếp từ trình duyệt",
    description:
      "Tổng hợp các tiêu chuẩn bắt buộc trên tem nhãn vàng trang sức mỹ nghệ theo Thông tư 22 và giải pháp in tem kim hoàn 2 cánh TSPL/ZPL trực tiếp qua Web Serial không cần phần mềm rời.",
    heroImage: "/images/screens/in-tem-kim-hoan.jpg?v=3",
    heroAlt:
      "Màn hình xem trước và in tem kim hoàn 2 cánh chuẩn Thông tư 22 trực tiếp từ trình duyệt",
    relatedFeatureId: "in-tem-kim-hoan",
    relatedFeatureName: "In tem kim hoàn Thông tư 22",
    recommendedPlan: "Professional (5.000.000đ/tháng)",
    keyTakeaways: [
      "Nắm rõ các thông số bắt buộc trên nhãn hàng hoá vàng trang sức, mỹ nghệ theo Thông tư 22/2013/TT-BKHCN để tránh rủi ro phạt hành chính.",
      "Chuẩn hoá bố cục tem kim hoàn 2 cánh (40mm × 10mm × 2) gồm cánh mã vạch và cánh thông tin trọng lượng, tuổi vàng, tiền công.",
      "In trực tiếp ra máy in tem TSPL/ZPL ngay từ trình duyệt web qua Web Serial mà không cần cài đặt phần mềm thiết kế tem trung gian.",
      "Kết nối liền mạch với quy trình bán vàng theo tuổi (Khối lượng × Giá tuổi + Công + Đá) và thu mua cân trừ đá, trừ dơ.",
    ],
    sections: [
      {
        heading:
          "1. Những thông tin bắt buộc phải có trên tem nhãn vàng trang sức theo Thông tư 22",
        paragraphs: [
          "Trong các đợt kiểm tra định kỳ của Quản lý thị trường và Chi cục Tiêu chuẩn Đo lường Chất lượng, việc ghi nhãn hàng hoá đối với vàng trang sức, mỹ nghệ theo Thông tư 22/2013/TT-BKHCN của Bộ Khoa học và Công nghệ là hạng mục được rà soát đầu tiên. Các tiệm vàng vẫn viết tem giấy bằng tay hoặc in tem thiếu thông số trọng lượng đá/vàng thuần rất dễ bị lập biên bản xử phạt.",
          "Theo quy định, mỗi sản phẩm vàng trang sức bày bán tại quầy phải có tem nhãn thể hiện minh bạch hàm lượng vàng (tuổi vàng), khối lượng vàng nguyên chất, khối lượng đá quý/vật gắn kèm (nếu có), tiền công chế tác và ký hiệu của cơ sở sản xuất/kinh doanh.",
        ],
        bullets: [
          {
            title: "Tách bạch Khối lượng tổng – Khối lượng đá – Khối lượng vàng",
            detail:
              "Tem phải ghi rõ cân tổng (KL tổng), phần trọng lượng đá/hột (KL đá) và phần trọng lượng vàng thực tế dùng để tính tiền (KL vàng), đơn vị tính bằng chỉ/phân/ly hoặc gram.",
          },
          {
            title: "Hàm lượng vàng (Tuổi vàng) & Ký hiệu tiệm",
            detail:
              "Hiển thị rõ tuổi vàng (9999, 999, 24K, 18K, 610, 14K, 10K, bạc 925), tiền công chế tác và tên/mã hiệu tiệm vàng.",
          },
        ],
      },
      {
        heading:
          "2. Tại sao tiệm vàng nên bỏ quy trình xuất Excel sang phần mềm in tem rời?",
        paragraphs: [
          "Trước đây, mỗi khi nhập một lô hàng trang sức mới, nhân viên tiệm vàng thường phải nhập danh sách vào một file Excel, sau đó mở phần mềm thiết kế mã vạch rời trên một máy tính Windows cố định để căn chỉnh từng dòng rồi mới bấm in. Chỉ cần lệch cấu hình driver hoặc đổi máy tính là toàn bộ khung tem bị nhảy lệch mép.",
          "Với ERP Vàng Bạc của Goplus, trình sinh mã lệnh máy in TSPL và ZPL được tích hợp thẳng vào giao diện web của phần mềm.",
        ],
        bullets: [
          {
            title: "Xem trước trực quan tem 2 cánh ngay trên màn hình",
            detail:
              "Hiển thị chính xác bố cục cánh trái (mã vạch 1D/QR, mã sản phẩm, tên món) và cánh phải (KL tổng, KL đá, KL vàng, tiền công, tuổi vàng, tên tiệm) trước khi bấm in.",
          },
          {
            title: "In 1 chạm qua Web Serial hoặc xuất file .prn",
            detail:
              "Tương thích hầu hết các dòng máy in tem kim hoàn phổ biến (Godex, Zebra, Bixolon, Xprinter) mà không cần cài phần mềm thứ 3.",
          },
        ],
      },
      {
        heading:
          "3. Khép kín từ In tem nhập kho đến Bán hàng & Thu mua trừ đá, trừ dơ",
        paragraphs: [
          "Khi từng món trang sức trên khay trưng bày đã được dán tem chuẩn mã vạch từ ERP Vàng Bạc, thao tác của thu ngân tại quầy trở nên cực kỳ nhanh và chính xác.",
        ],
        bullets: [
          {
            title: "Quét mã tính tiền theo bảng giá tuổi vàng đang chạy",
            detail:
              "Phần mềm tự lấy Khối lượng vàng thuần trên tem × Giá bán của tuổi vàng tương ứng + Tiền công + Tiền đá.",
          },
          {
            title: "Thu mua vàng cũ cân trừ đá, trừ dơ & đổi bù trên 1 phiếu",
            detail:
              "Khi khách mang vàng cũ đến bán hoặc đổi món mới, thu ngân nhập cân tổng, trừ đá, trừ dơ để ra vàng thuần nhân giá thu mua; phần mềm tự cấn trừ chênh lệch ngay trên cùng một đơn hàng.",
          },
        ],
      },
    ],
  },
  {
    slug: "ket-noi-hoa-don-dien-tu-misa-amis-cho-tiem-vang-bac",
    category: "Kế toán & Thuế",
    readTime: "5 phút đọc",
    publishedAt: "2026-10-18",
    title:
      "Giải pháp đồng bộ phần mềm bán hàng tiệm vàng bạc với kế toán & hoá đơn điện tử MISA AMIS chuẩn quy định thuế",
    description:
      "Cách tự động hoá quy trình đẩy chứng từ bán vàng bạc, thu mua, sổ quỹ và giá vốn thực tế từng đơn từ quầy POS sang MISA AMIS mà kế toán không phải gõ lại từng tờ hoá đơn.",
    heroImage: "/images/screens/lai-lo-tung-don.jpg?v=3",
    heroAlt:
      "Màn hình báo cáo lãi lỗ theo từng đơn và đối soát đồng bộ chứng từ sang MISA AMIS",
    relatedFeatureId: "bao-cao",
    relatedFeatureName: "Báo cáo lãi lỗ & Đồng bộ MISA AMIS",
    recommendedPlan: "Professional (5.000.000đ/tháng)",
    keyTakeaways: [
      "Giải quyết triệt để tình trạng kế toán tiệm vàng phải ngồi gõ lại hàng trăm phiếu bán lẻ mỗi cuối tháng vào MISA.",
      "Tính chuẩn xác lợi nhuận gộp theo giá vốn thực tế của từng đơn bán vàng trang sức và bạc tích trữ.",
      "Đồng bộ danh mục hàng hoá, khách hàng và chứng từ bán hàng, thu chi sang MISA AMIS kèm bảng đối soát chống đẩy trùng.",
      "Tự động gửi mã tra cứu hoá đơn điện tử MISA cho khách hàng qua tin nhắn Zalo OA (ZNS) ngay khi phát hành.",
    ],
    sections: [
      {
        heading:
          "1. Nỗi ám ảnh nhập liệu lại chứng từ cuối tháng của kế toán ngành vàng bạc",
        paragraphs: [
          "Khi cơ quan thuế siết chặt quy định về hoá đơn điện tử khởi tạo từ máy tính tiền và minh bạch sổ sách đối với hoạt động kinh doanh vàng bạc đá quý, các tiệm vàng và chuỗi đại lý bạc tích trữ không thể tiếp tục ghi phiếu tay rời rạc.",
          "Tuy nhiên, nếu dùng phần mềm kế toán MISA AMIS trực tiếp tại quầy bán lẻ thì thu ngân rất khó thao tác vì MISA không được thiết kế để bắt giá vàng bạc nhảy từng phút, không có đồng hồ khoá giá POS và không có công thức cân trừ đá, trừ dơ hay đổi cũ lấy mới trên một màn hình. Ngược lại, nếu dùng một phần mềm bán hàng rời không có kết nối API, cuối tháng kế toán phải gõ lại hàng nghìn giao dịch sang MISA.",
        ],
        bullets: [
          {
            title: "Quầy bán hàng dùng POS chuyên biệt, Kế toán dùng MISA như cũ",
            detail:
              "Thu ngân thao tác cực nhanh trên giao diện POS ERP Vàng Bạc; toàn bộ chứng từ phát sinh được chuẩn hoá để đẩy thẳng sang MISA AMIS.",
          },
          {
            title: "Bảng đối soát chứng từ minh bạch",
            detail:
              "Kiểm tra trạng thái từng đơn đã đồng bộ sang MISA hay chưa, đối soát theo mã chứng từ để tuyệt đối không xảy ra đẩy trùng.",
          },
        ],
      },
      {
        heading:
          "2. Kiểm soát lãi lỗ từng đơn theo giá vốn thực tế & Kiểm quỹ mệnh giá cuối ca",
        paragraphs: [
          "Với biên lợi nhuận mỏng của mảng bạc tích trữ và vàng 9999 (thường chỉ chênh 1–3%), việc tính giá vốn bình quân cuối kỳ kiểu cũ khiến chủ tiệm không biết được đơn bán lúc 9h sáng hay đơn bán lúc 3h chiều thực sự lời bao nhiêu tiền.",
        ],
        bullets: [
          {
            title: "Báo cáo lãi gộp trên từng đơn hàng",
            detail:
              "Đối chiếu trực tiếp doanh thu đơn bán với giá vốn lô nhập (hoặc giá đặt đơn YD...K từ Phú Quý) để hiển thị ngay số tiền lãi và % tỷ suất lợi nhuận.",
          },
          {
            title: "Gạch nợ tự động VietQR & Kiểm quỹ theo mệnh giá",
            detail:
              "Đơn chuyển khoản tự cập nhật khi ngân hàng báo có; tiền mặt cuối ca được kiểm đếm theo từng mệnh giá (500.000đ, 200.000đ, 100.000đ...) đối chiếu khớp tuyệt đối với sổ quỹ.",
          },
          {
            title: "Gửi thông báo hoá đơn MISA qua Zalo OA (ZNS)",
            detail:
              "Ngay khi kế toán phát hành hoá đơn điện tử MISA, hệ thống tự động nhắn mã tra cứu hoá đơn về Zalo của khách hàng.",
          },
        ],
      },
    ],
  },
  {
    slug: "quan-ly-cam-do-vang-bac-va-kiem-ke-kho-da-chi-nhanh",
    category: "Cầm đồ & Đa chi nhánh",
    readTime: "6 phút đọc",
    publishedAt: "2026-10-18",
    title:
      "Kinh nghiệm quản lý hiệu cầm đồ vàng bạc, sơ đồ ô két tài sản & kiểm soát tồn kho chuỗi tiệm vàng đa chi nhánh",
    description:
      "Phương pháp số hoá hợp đồng cầm đồ vàng bạc, tính lãi phí theo ngày thực tế, quản lý vị trí từng món cầm trong ô két sắt và điều chuyển hàng hoá chặt chẽ giữa các chi nhánh.",
    heroImage: "/images/screens/o-luu-tai-san.jpg?v=3",
    heroAlt:
      "Sơ đồ ô lưu giữ tài sản cầm đồ theo khu và ngăn két tại từng chi nhánh",
    relatedFeatureId: "cam-do",
    relatedFeatureName: "Hợp đồng cầm đồ & Kho tài sản cầm",
    recommendedPlan: "Business (7.000.000đ/tháng)",
    keyTakeaways: [
      "Định giá món cầm chuẩn xác theo bảng giá tuổi vàng tại thời điểm nhận cầm và kiểm soát hạn mức cầm tối đa.",
      "Tính lãi phí cầm đồ linh hoạt theo số ngày thực tế (làm tròn 1.000đ), tự động gửi Zalo OA nhắc khách trước ngày tới hạn chuộc.",
      "Quản lý sơ đồ ô két lưu giữ tài sản cầm theo từng chi nhánh: biết chính xác món cầm của hợp đồng nào đang nằm ở ngăn két nào.",
      "Điều chuyển hàng hoá có xác nhận 2 đầu giữa Kho chính, Quầy trưng bày và các chi nhánh kèm kiểm kê định kỳ.",
    ],
    sections: [
      {
        heading:
          "1. Chuẩn hoá hợp đồng cầm đồ vàng bạc: Định giá theo tuổi vàng & Tính lãi ngày tự động",
        paragraphs: [
          "Tại các tiệm vàng kết hợp dịch vụ cầm đồ hoặc các chuỗi hiệu cầm đồ chuyên nghiệp, việc thẩm định giá trị món cầm và tính toán các kỳ đóng lãi/gia hạn/chuộc đồ nếu làm trên sổ giấy rất dễ dẫn đến sai lệch giữa các ca trực của nhân viên.",
          "Trên phân hệ Cầm đồ của ERP Vàng Bạc, quy trình nhận cầm được nối thẳng với bảng giá tuổi vàng thời gian thực của tiệm.",
        ],
        bullets: [
          {
            title: "Định giá & Kiểm soát hạn mức nhận cầm",
            detail:
              "Tự tính giá trị tài sản theo khối lượng và tuổi vàng hiện hành; nếu số tiền khách muốn cầm vượt tỷ lệ hạn mức an toàn, hệ thống yêu cầu cấp quản lý phê duyệt.",
          },
          {
            title: "Gói lãi phí linh hoạt & Nhắc hạn tự động qua Zalo",
            detail:
              "Khai báo gói lãi phí theo %/tháng và quy đổi tự động ra từng ngày thực tế khi khách đóng lãi, gia hạn hoặc chuộc sớm. Trước ngày đến hạn, hệ thống tự gửi tin Zalo nhắc khách.",
          },
        ],
      },
      {
        heading:
          "2. Sơ đồ ô két tài sản cầm & Điều chuyển kho liên chi nhánh chống thất thoát",
        paragraphs: [
          "Rủi ro lớn nhất của chủ hiệu cầm đồ và chuỗi tiệm vàng nhiều chi nhánh là khi kiểm kê phát hiện thiếu 1–2 món trang sức nhưng không thể truy vết món đó đang nằm ở ngăn két nào, ngoài khay trưng bày hay đang trên đường điều chuyển sang chi nhánh khác.",
        ],
        bullets: [
          {
            title: "Gắn vị trí từng món cầm vào Sơ đồ ô két",
            detail:
              "Mỗi hợp đồng cầm đồ sau khi niêm phong đều được gắn vào một ô lưu cụ thể trong két của chi nhánh, hiển thị trực quan sức chứa và lịch sử ra/vào.",
          },
          {
            title: "Tách bạch Kho chính – Quầy trưng bày – Chi nhánh",
            detail:
              "Mọi lệnh xuất hàng từ két tổng ra khay trưng bày hoặc điều chuyển giữa Chi nhánh 1 và Chi nhánh 2 đều phải có phiếu điều chuyển xác nhận 2 đầu.",
          },
          {
            title: "Phiếu kiểm kê đối chiếu sổ sách & thực tế",
            detail:
              "Cuối tuần hoặc cuối tháng, nhân viên đếm thực tế và nhập vào phiếu kiểm kê; hệ thống lập tức chỉ ra mã sản phẩm hay hợp đồng cầm nào đang lệch và lý do lệch.",
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
    <div className="sysdark:bg-[#08090B] sysdark:text-[#F5F7FA] sysdark:selection:bg-[#9C7218] min-h-dvh bg-white text-[#0B1220] antialiased selection:bg-[#8A6516] selection:text-white">
      <VbHeader active="Cẩm nang" />

      <div>
        <div aria-hidden="true" className="h-[76px]" />

        {/* ---------- Hero Cẩm nang ---------- */}
        <section className="sysdark:bg-[#0E0A03] sysdark:bg-[radial-gradient(ellipse_75%_85%_at_82%_0%,rgba(218,165,52,0.38),transparent_68%),linear-gradient(135deg,#0E0A03_0%,#241906_52%,#120C03_100%)] relative overflow-hidden bg-[#241906] bg-[radial-gradient(ellipse_75%_85%_at_82%_0%,rgba(218,165,52,0.45),transparent_68%),linear-gradient(135deg,#241906_0%,#4A350C_52%,#261B07_100%)] py-14 lg:py-20">
          <CubeBackdrop id="vb-cubes-guides" />
          <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <p className="font-mono text-xs font-medium tracking-[0.08em] text-[#E8D49A] uppercase">
                  Cẩm nang vận hành · Pháp lý · Chuyển đổi số ngành vàng bạc
                </p>
                <h1
                  className="mt-3 font-semibold tracking-[-0.025em] [text-wrap:balance] text-white"
                  style={{
                    fontSize: "clamp(1.75rem, 2.6vw, 2.5rem)",
                    lineHeight: 1.18,
                  }}
                >
                  Kinh nghiệm quản lý đại lý bạc tích trữ, tiệm vàng truyền
                  thống &amp; hiệu cầm đồ
                </h1>
                <p className="mt-3 text-base leading-relaxed text-[#E4E7EE]">
                  Tổng hợp quy trình vận hành thực tế: chống trượt giá tại quầy
                  POS, nối đơn Phú Quý, in tem kim hoàn chuẩn Thông tư 22, đồng
                  bộ hoá đơn điện tử MISA AMIS và kiểm soát két tài sản đa chi
                  nhánh.
                </p>
              </div>
              <div className="flex shrink-0 flex-wrap gap-3">
                <Link
                  href="/ho-so-giai-phap"
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                >
                  <FileText className="h-4 w-4 text-[#E8D49A]" />
                  Xem Hồ sơ giải pháp (PDF)
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- Danh sách bài viết ---------- */}
        <div className="relative overflow-x-clip">
          <GuideRails />

          <section className="sysdark:border-[#1F232A] relative border-b border-[#E3E7EE] py-14 lg:py-20">
            <RailMarks />
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                {GUIDES.map((g, idx) => (
                  <article
                    key={g.slug}
                    className="sysdark:border-[#262B33] sysdark:bg-[#111317] group flex flex-col overflow-hidden rounded-xl border border-[#D6DCE6] bg-white shadow-sm transition-all hover:border-[#8A6516]"
                  >
                    <Link
                      href={`${GUIDES_PATH}/${g.slug}`}
                      className="sysdark:border-[#1F232A] relative block aspect-[16/10] w-full overflow-hidden border-b border-[#E3E7EE] bg-[#F8FAFC]"
                    >
                      <Image
                        src={g.heroImage}
                        alt={g.heroAlt}
                        width={1440}
                        height={900}
                        sizes="(min-width: 1024px) 540px, 100vw"
                        className="h-full w-full object-contain object-center transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                    </Link>

                    <div className="flex flex-1 flex-col p-6 sm:p-7">
                      <div className="flex flex-wrap items-center gap-2.5 text-xs">
                        <span className="sysdark:bg-[#4A3A14] sysdark:text-[#E3C77A] rounded-full bg-[#FBF5E6] px-2.5 py-1 font-mono font-semibold text-[#8A6516]">
                          {String(idx + 1).padStart(2, "0")} · {g.category}
                        </span>
                        <span className="sysdark:text-[#8B93A3] inline-flex items-center gap-1 text-[#5B6475]">
                          <Clock className="h-3.5 w-3.5" />
                          {g.readTime}
                        </span>
                      </div>

                      <h2 className="sysdark:text-[#F5F7FA] mt-3.5 text-xl leading-snug font-bold text-[#0B1220]">
                        <Link
                          href={`${GUIDES_PATH}/${g.slug}`}
                          className="sysdark:group-hover:text-[#E3C77A] group-hover:text-[#8A6516]"
                        >
                          {g.title}
                        </Link>
                      </h2>

                      <p className="sysdark:text-[#A3AAB8] mt-2.5 flex-1 text-sm leading-relaxed text-[#4B5565]">
                        {g.description}
                      </p>

                      <ul className="sysdark:border-[#1F232A] sysdark:text-[#C9CED8] mt-5 space-y-1.5 border-t border-[#E3E7EE] pt-4 text-xs text-[#374151]">
                        {g.keyTakeaways.slice(0, 2).map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <Check className="sysdark:text-[#E3C77A] mt-0.5 h-3.5 w-3.5 shrink-0 text-[#8A6516]" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-5 flex items-center justify-between pt-2">
                        <Link
                          href={`${GUIDES_PATH}/${g.slug}`}
                          className="sysdark:text-[#E3C77A] inline-flex items-center gap-1.5 text-sm font-semibold text-[#8A6516] hover:underline"
                        >
                          Đọc chi tiết bài viết
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                        <Link
                          href={`${FEATURES_HREF}#${g.relatedFeatureId}`}
                          className="sysdark:text-[#8B93A3] sysdark:hover:text-white text-xs font-medium text-[#5B6475] hover:text-[#0B1220]"
                        >
                          Phân hệ: {g.relatedFeatureName}
                        </Link>
                      </div>
                    </div>
                  </article>
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

export function VbGuideDetailPage({ article }: { article: GuideArticle }) {
  const otherGuides = GUIDES.filter((g) => g.slug !== article.slug)

  return (
    <div className="sysdark:bg-[#08090B] sysdark:text-[#F5F7FA] sysdark:selection:bg-[#9C7218] min-h-dvh bg-white text-[#0B1220] antialiased selection:bg-[#8A6516] selection:text-white">
      <VbHeader active="Cẩm nang" />

      <div>
        <div aria-hidden="true" className="h-[76px]" />

        <div className="relative overflow-x-clip">
          <GuideRails />

          {/* ---------- Đầu bài viết ---------- */}
          <header className="sysdark:border-[#1F232A] sysdark:bg-[#0E1014] relative border-b border-[#E3E7EE] bg-[#F7F9FC] py-10 lg:py-14">
            <RailMarks />
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
              <div className="flex flex-wrap items-center gap-3 text-xs">
                <Link
                  href={GUIDES_PATH}
                  className="sysdark:text-[#E3C77A] inline-flex items-center gap-1.5 font-semibold text-[#8A6516] hover:underline"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Cẩm nang vận hành
                </Link>
                <span className="text-[#8B93A3]">/</span>
                <span className="sysdark:bg-[#262B33] sysdark:text-[#E6E9EF] rounded-full bg-white px-2.5 py-1 font-mono font-medium text-[#1F2937]">
                  {article.category}
                </span>
                <span className="sysdark:text-[#8B93A3] inline-flex items-center gap-1 text-[#5B6475]">
                  <Clock className="h-3.5 w-3.5" />
                  {article.readTime}
                </span>
              </div>

              <h1
                className="sysdark:text-[#F5F7FA] mt-4 font-semibold tracking-[-0.02em] [text-wrap:balance] text-[#0B1220]"
                style={{
                  fontSize: "clamp(1.6rem, 2.5vw, 2.25rem)",
                  lineHeight: 1.2,
                }}
              >
                {article.title}
              </h1>

              <p className="sysdark:text-[#A3AAB8] mt-3 text-base leading-relaxed text-[#4B5565]">
                {article.description}
              </p>

              {/* Tóm tắt trọng tâm */}
              <div className="sysdark:border-[#4A3A14] sysdark:bg-[#131009] mt-6 rounded-xl border border-[#E6D7B0] bg-[#FAF6EC] p-5">
                <p className="sysdark:text-[#E3C77A] flex items-center gap-2 font-mono text-xs font-semibold tracking-wider text-[#8A6516] uppercase">
                  <BookOpen className="h-4 w-4" />
                  Điểm cốt lõi cho chủ tiệm &amp; đại lý
                </p>
                <ul className="sysdark:text-[#E6E9EF] mt-3 space-y-2 text-sm text-[#1F2937]">
                  {article.keyTakeaways.map((point) => (
                    <li key={point} className="flex items-start gap-2.5">
                      <Check className="sysdark:text-[#E3C77A] mt-0.5 h-4 w-4 shrink-0 text-[#8A6516]" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </header>

          {/* ---------- Ảnh minh hoạ màn hình thực tế ---------- */}
          <div className="sysdark:border-[#1F232A] relative border-b border-[#E3E7EE] py-8 lg:py-10">
            <div className="relative isolate mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
              <SoftGlow />
              <div className="sysdark:border-[#262B33] sysdark:bg-[#111317] overflow-hidden rounded-xl border border-[#D6DCE6] bg-white shadow-lg">
                <div className="sysdark:border-[#1F232A] sysdark:bg-[#16191E] flex h-8 items-center justify-between border-b border-[#E3E7EE] bg-[#F4F6FA] px-3 text-xs text-[#6B7485]">
                  <div className="flex items-center gap-1.5">
                    <span className="sysdark:bg-[#262B33] h-2.5 w-2.5 rounded-full bg-[#D6DCE6]" />
                    <span className="sysdark:bg-[#262B33] h-2.5 w-2.5 rounded-full bg-[#D6DCE6]" />
                    <span className="sysdark:bg-[#262B33] h-2.5 w-2.5 rounded-full bg-[#D6DCE6]" />
                  </div>
                  <span className="font-mono text-[11px]">
                    ERP Vàng Bạc — Phân hệ {article.relatedFeatureName}
                  </span>
                </div>
                <Image
                  src={article.heroImage}
                  alt={article.heroAlt}
                  width={1440}
                  height={900}
                  priority
                  sizes="(min-width: 1024px) 896px, 100vw"
                  className="block aspect-[16/10] w-full bg-[#F8FAFC] object-contain object-center"
                />
              </div>
            </div>
          </div>

          {/* ---------- Nội dung chi tiết ---------- */}
          <article className="sysdark:border-[#1F232A] relative border-b border-[#E3E7EE] py-12 lg:py-16">
            <RailMarks />
            <div className="mx-auto max-w-3xl space-y-12 px-4 sm:px-6 lg:px-8">
              {article.sections.map((sec) => (
                <section key={sec.heading} className="space-y-4">
                  <h2 className="sysdark:text-[#F5F7FA] text-xl leading-snug font-bold text-[#0B1220] sm:text-2xl">
                    {sec.heading}
                  </h2>
                  {sec.paragraphs.map((p) => (
                    <p
                      key={p}
                      className="sysdark:text-[#C9CED8] text-base leading-relaxed text-[#374151]"
                    >
                      {p}
                    </p>
                  ))}
                  {sec.bullets && (
                    <div className="mt-5 grid grid-cols-1 gap-4 pt-2">
                      {sec.bullets.map((b) => (
                        <div
                          key={b.title}
                          className="sysdark:border-[#262B33] sysdark:bg-[#111317] rounded-lg border border-[#E3E7EE] bg-[#F7F9FC] p-4"
                        >
                          <p className="sysdark:text-[#F5F7FA] flex items-center gap-2 text-sm font-bold text-[#0B1220]">
                            <Check className="sysdark:text-[#E3C77A] h-4 w-4 shrink-0 text-[#8A6516]" />
                            {b.title}
                          </p>
                          <p className="sysdark:text-[#A3AAB8] mt-1 pl-6 text-sm leading-relaxed text-[#4B5565]">
                            {b.detail}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              ))}

              {/* Khối kêu gọi hành động giữa bài */}
              <div className="sysdark:border-[#4A3A14] sysdark:bg-[#141F30] rounded-xl border border-[#0F1B2D] bg-[#0F1B2D] p-6 text-white sm:p-8">
                <p className="font-mono text-xs font-semibold tracking-wider text-[#E8D49A] uppercase">
                  Giải pháp khuyến nghị: Gói {article.recommendedPlan}
                </p>
                <h3 className="mt-2 text-lg font-bold sm:text-xl">
                  Trải nghiệm trực tiếp phân hệ {article.relatedFeatureName}{" "}
                  trên dữ liệu mẫu
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#C3CAD6]">
                  Đội ngũ Goplus hỗ trợ demo 1-1 qua Google Meet hoặc trực tiếp
                  tại tiệm, cài đặt cơ sở dữ liệu độc lập và đào tạo nhân viên
                  tận nơi.
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <a
                    href={CONTACT.zalo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[#C99A2E] px-5 py-2.5 text-sm font-semibold text-[#0B1220] transition-colors hover:bg-[#D9B24E]"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Nhắn Zalo hẹn lịch Demo
                  </a>
                  <Link
                    href={`${FEATURES_HREF}#${article.relatedFeatureId}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/30 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                  >
                    Xem thông số kỹ thuật phân hệ
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </article>

          {/* ---------- Bài viết liên quan ---------- */}
          <section className="sysdark:border-[#1F232A] relative border-b border-[#E3E7EE] py-12 lg:py-16">
            <RailMarks />
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <Eyebrow>Đọc tiếp</Eyebrow>
              <h2
                className="sysdark:text-[#F5F7FA] mt-2 font-medium tracking-[-0.02em] text-[#0B1220]"
                style={HEADING_STYLE}
              >
                Cẩm nang vận hành khác
              </h2>
              <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
                {otherGuides.map((g) => (
                  <Link
                    key={g.slug}
                    href={`${GUIDES_PATH}/${g.slug}`}
                    className="sysdark:border-[#262B33] sysdark:bg-[#111317] group flex flex-col justify-between rounded-xl border border-[#D6DCE6] bg-white p-5 transition-colors hover:border-[#8A6516]"
                  >
                    <div>
                      <span className="sysdark:text-[#E3C77A] font-mono text-xs font-semibold text-[#8A6516]">
                        {g.category}
                      </span>
                      <h3 className="sysdark:text-[#F5F7FA] sysdark:group-hover:text-[#E3C77A] mt-2 text-base leading-snug font-bold text-[#0B1220] group-hover:text-[#8A6516]">
                        {g.title}
                      </h3>
                    </div>
                    <span className="sysdark:text-[#8B93A3] mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#5B6475]">
                      Xem bài viết
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
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
