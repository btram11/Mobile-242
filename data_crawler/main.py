import json
import requests
from bs4 import BeautifulSoup
import concurrent.futures

######## Add thêm môn vào đây để lấy thêm tài liệu ########
subjects = ["văn+học", "ngôn+ngữ"]
###########################################################

def get_field(field_label, soup):
    label_td = soup.find('td', class_="bibInfoLabel", string=lambda t: t and field_label in t)
    if label_td:
        data_td = label_td.find_next_sibling('td')
        if data_td:
            return data_td.get_text(strip=True)

def get_detail(book):
    url = f"https://opac.vnulib.edu.vn{book}"
    response = requests.get(url)
    response.encoding= 'utf-8'
    soup  = BeautifulSoup(response.text, "html.parser")
    title= get_field("Nhan đề", soup)
    author = get_field("Tác giả", soup)
    publication = get_field("Xuất bản", soup)
    summary=get_field("Tóm tắt", soup)
    subject = get_field("Chủ đề", soup)
    return {
        'title': title,
        'author': author,
        'publication': publication,
        'summary': summary,
        'subject': subject 
    }

def get_list_books(subjects):
    all_book_links = []
    for x in subjects:
        url = f"https://opac.vnulib.edu.vn/search*vie/?searchtype=X&SORT=D&searcharg={x}&searchscope=1"
        response = requests.get(url)
        response.encoding= 'utf-8'
        soup  = BeautifulSoup(response.text, "html.parser")
        book_anchor_tags = soup.select('h2.briefcitTitle a') 
        book_links = [tag.get('href') for tag in book_anchor_tags]
        all_book_links.extend(book_links)

    return all_book_links 

def main():
    list_books = get_list_books(subjects)
    results = []
    with concurrent.futures.ThreadPoolExecutor(max_workers=20) as executor:
        futures = [executor.submit(get_detail, book) for book in list_books]
        for future in concurrent.futures.as_completed(futures):
            try:
                detail_book = future.result()
                results.append(detail_book)
            except Exception as e:
                print("Error processing a book:", e)

    with open("books.json", "w", encoding="utf-8") as f:
        json.dump(results, f, ensure_ascii=False, indent=4)

if __name__ == "__main__":
    main()