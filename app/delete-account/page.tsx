import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  AlertTriangle,
  Trash2,
  Shield,
  Clock,
  CheckCircle,
  ArrowLeft,
  Smartphone,
  Mail,
  Phone,
} from "lucide-react";
import Link from "next/link";

const DeleteAccountPage = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Image
              src="/logo.png"
              alt="Hi-Vision Logo"
              width={60}
              height={60}
              className="mr-3"
            />
            <h1 className="text-3xl font-bold text-gray-800">Hi-Vision</h1>
          </div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Hướng dẫn xóa tài khoản
          </h2>
          <p className="text-gray-600">
            Hướng dẫn chi tiết để xóa tài khoản Hi-Vision của bạn một cách an
            toàn
          </p>
        </div>

        {/* Warning Alert */}
        <Alert className="mb-8 border-orange-200 bg-orange-50">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-800">
            <strong>Lưu ý quan trọng:</strong> Việc xóa tài khoản là không thể
            hoàn tác. Tất cả dữ liệu y tế, lịch hẹn và thông tin cá nhân sẽ bị
            xóa vĩnh viễn.
          </AlertDescription>
        </Alert>

        {/* Steps */}
        <div className="space-y-6">
          {/* Step 1 */}
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                  1
                </span>
                Đăng nhập vào ứng dụng Hi-Vision
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Smartphone className="h-5 w-5 text-blue-500 mt-1" />
                  <div>
                    <p className="font-medium">
                      Mở ứng dụng Hi-Vision trên điện thoại
                    </p>
                    <p className="text-gray-600 text-sm">
                      Đảm bảo bạn đã cài đặt phiên bản mới nhất của ứng dụng
                    </p>
                  </div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Lưu ý:</strong> Bạn cần đăng nhập bằng tài khoản mà
                    bạn muốn xóa
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Step 2 */}
          <Card className="border-l-4 border-l-green-500">
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                  2
                </span>
                Truy cập màn hình Cài đặt (Settings)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-medium text-blue-600">
                      Cách 1: Thông qua Avatar
                    </h4>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <ul className="text-sm text-gray-700 space-y-2">
                        <li className="flex items-start space-x-2">
                          <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">
                            1
                          </span>
                          <span>
                            Trên màn hình chính (Home), nhấn vào{" "}
                            <strong>avatar</strong> của bạn ở góc trên bên trái
                          </span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">
                            2
                          </span>
                          <span>Màn hình Settings sẽ hiển thị</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium text-green-600">
                      Cách 2: Thông qua Bottom Bar
                    </h4>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <ul className="text-sm text-gray-700 space-y-2">
                        <li className="flex items-start space-x-2">
                          <span className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">
                            1
                          </span>
                          <span>
                            Nhấn vào biểu tượng <strong>bánh răng</strong> (⚙️)
                            ở thanh điều hướng dưới cùng
                          </span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">
                            2
                          </span>
                          <span>Màn hình Settings sẽ mở ra</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <p className="text-sm text-yellow-800">
                    <strong>💡 Mẹo:</strong> Cả hai cách đều dẫn đến cùng một
                    màn hình Settings. Bạn có thể chọn cách nào thuận tiện nhất!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Step 3 */}
          <Card className="border-l-4 border-l-purple-500">
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <span className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                  3
                </span>
                Tìm nút "Delete Account" trong màn hình Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <p className="text-sm text-red-800 font-medium">
                    <strong>📍 Vị trí:</strong> Nút "Delete Account" nằm ở cuối
                    màn hình Settings, trong phần "Danger Zone"
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-gray-800">
                    Cách tìm nút Delete Account:
                  </h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <ol className="text-sm text-gray-700 space-y-2">
                      <li className="flex items-start space-x-2">
                        <span className="bg-purple-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">
                          1
                        </span>
                        <span>
                          Trong màn hình Settings,{" "}
                          <strong>cuộn xuống dưới cùng</strong>
                        </span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="bg-purple-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">
                          2
                        </span>
                        <span>
                          Tìm phần có tiêu đề <strong>"Danger Zone"</strong>{" "}
                          (vùng nguy hiểm)
                        </span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="bg-purple-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">
                          3
                        </span>
                        <span>
                          Trong phần này, bạn sẽ thấy nút{" "}
                          <strong>"Delete Account"</strong> với biểu tượng thùng
                          rác
                        </span>
                      </li>
                    </ol>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2 text-red-600">
                      Đặc điểm nhận dạng:
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Nằm trong thẻ màu đỏ nhạt</li>
                      <li>• Có biểu tượng thùng rác (🗑️)</li>
                      <li>• Chữ "Delete Account" màu đỏ</li>
                      <li>• Có mũi tên chỉ sang phải (&gt;)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2 text-orange-600">Lưu ý:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Nút này ở cuối cùng của màn hình</li>
                      <li>• Có thể cần cuộn xuống để thấy</li>
                      <li>• Nằm dưới các tùy chọn khác như "Sign Out"</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Step 4 */}
          <Card className="border-l-4 border-l-red-500">
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <span className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                  4
                </span>
                Xác nhận xóa tài khoản
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <p className="text-sm text-red-800 font-medium">
                    ⚠️ Bước này rất quan trọng - Hãy đọc kỹ trước khi xác nhận!
                  </p>
                </div>
                <div className="space-y-3">
                  <h4 className="font-medium">Bạn sẽ được yêu cầu:</h4>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Nhập mật khẩu để xác thực</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Đọc và đồng ý với điều khoản xóa tài khoản</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>
                        Xác nhận rằng bạn hiểu hậu quả của việc xóa tài khoản
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Step 5 */}
          <Card className="border-l-4 border-l-indigo-500">
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <span className="bg-indigo-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                  5
                </span>
                Chờ xử lý và xác nhận
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-indigo-500 mt-1" />
                  <div>
                    <p className="font-medium">Thời gian xử lý</p>
                    <p className="text-gray-600 text-sm">
                      Quá trình xóa tài khoản có thể mất từ 24-48 giờ để hoàn
                      tất
                    </p>
                  </div>
                </div>
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <p className="text-sm text-indigo-800">
                    <strong>Lưu ý:</strong> Bạn sẽ nhận được email xác nhận khi
                    tài khoản đã được xóa hoàn toàn
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Important Information */}
        <Card className="mt-8 border-2 border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center text-orange-800">
              <Shield className="h-5 w-5 mr-2" />
              Thông tin quan trọng trước khi xóa tài khoản
            </CardTitle>
          </CardHeader>
          <CardContent className="text-orange-800">
            <div className="space-y-3">
              <div>
                <h4 className="font-medium mb-2">
                  Dữ liệu sẽ bị xóa vĩnh viễn:
                </h4>
                <ul className="text-sm space-y-1 ml-4">
                  <li>• Thông tin cá nhân và hồ sơ y tế</li>
                  <li>• Lịch hẹn và lịch sử khám bệnh</li>
                  <li>• Kết quả xét nghiệm và đơn thuốc</li>
                  <li>• Tin nhắn và cuộc trò chuyện với bác sĩ</li>
                  <li>• Tất cả dữ liệu liên quan đến tài khoản</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Khuyến nghị trước khi xóa:</h4>
                <ul className="text-sm space-y-1 ml-4">
                  <li>• Sao lưu các thông tin y tế quan trọng</li>
                  <li>• Tải xuống các kết quả xét nghiệm cần thiết</li>
                  <li>
                    • Liên hệ với bác sĩ để thảo luận về việc chuyển hồ sơ
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Support */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-center">Cần hỗ trợ thêm?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <p className="text-gray-600">
                Nếu bạn gặp khó khăn trong quá trình xóa tài khoản, hãy liên hệ
                với chúng tôi
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-6">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">support@hivision.com</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Back to Home */}
        <div className="text-center mt-8">
          <Link href="/">
            <Button variant="outline" className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Quay lại trang chủ</span>
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default DeleteAccountPage;
