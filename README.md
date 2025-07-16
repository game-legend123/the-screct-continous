# Mật Mã Liên Hoàn (Cipher Chain)

Chào mừng bạn đến với Mật Mã Liên Hoàn, một trò chơi giải đố mật mã hấp dẫn được xây dựng bằng Next.js và được hỗ trợ bởi trí tuệ nhân tạo (AI)! Hãy thử thách bản thân với các mật mã được tạo ra một cách độc đáo, giải mã chúng để tiến lên các cấp độ cao hơn và xem bạn có thể đi được bao xa.

![Screenshot of the game](https://placehold.co/800x600.png)

## Cách Chơi

1.  **Mục tiêu:** Mục tiêu chính của trò chơi là giải mã `cipherText` (thông điệp đã mã hóa) để tìm ra `plainText` (thông điệp gốc).
2.  **Bắt đầu:** Khi bạn bắt đầu trò chơi, bạn sẽ được cung cấp một mật mã ở Vòng 1.
3.  **Đoán và Kiểm tra:** Nhập lời giải của bạn vào ô "Lời giải của bạn" và nhấn nút "Kiểm Tra".
4.  **Lên cấp:** Nếu đoán đúng, bạn sẽ tiến lên vòng tiếp theo với một mật mã mới, khó hơn.
5.  **Mạng sống:** Bạn có 3 mạng (biểu thị bằng trái tim). Mỗi lần đoán sai, bạn sẽ mất một mạng. Nếu mất hết cả 3 mạng, trò chơi sẽ kết thúc.
6.  **Gợi ý:** Nếu gặp khó khăn, bạn có thể nhấn vào nút "Lấy Gợi Ý" để xem phương pháp mã hóa đã được sử dụng.
7.  **Chơi lại:** Khi thua, một hộp thoại sẽ hiện ra đáp án đúng và bạn có thể chọn "Chơi Lại" để bắt đầu một lượt chơi mới từ Vòng 1.

## Cài đặt và Chạy dự án

Để chạy dự án này trên máy tính của bạn, hãy làm theo các bước sau:

1.  **Clone a repository:**
    ```bash
    git clone https://github.com/your-username/mat-ma-lien-hoan.git
    cd mat-ma-lien-hoan
    ```

2.  **Cài đặt các dependency:**
    Sử dụng `npm` để cài đặt tất cả các gói cần thiết.
    ```bash
    npm install
    ```

3.  **Thiết lập biến môi trường:**
    Sao chép file `.env.example` thành `.env` và điền các API key cần thiết (nếu có).
    ```bash
    cp .env.example .env
    ```
    Bạn sẽ cần một API key từ Google AI Studio để Genkit có thể hoạt động.

4.  **Chạy server development:**
    ```bash
    npm run dev
    ```
    Thao tác này sẽ khởi động ứng dụng trên `http://localhost:9002`.

5.  **Chạy Genkit (tùy chọn, cho phát triển AI):**
    Để chạy môi trường phát triển Genkit và xem các flow, hãy mở một terminal khác và chạy:
    ```bash
    npm run genkit:watch
    ```

Chúc bạn chơi game vui vẻ!
