-- Mocking Data

CREATE TABLE admins (
  admin_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR ( 25 ) UNIQUE NOT NULL,
  password  TEXT NOT NULL
);

CREATE TABLE users (
  user_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  full_name VARCHAR ( 128 ) NOT NULL,
  birthdate  TIMESTAMPTZ NOT NULL,
  education VARCHAR ( 50 ) NOT NULL,
  email VARCHAR (255) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  avatar_directory TEXT
);

CREATE TABLE courses (
  course_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  admin_id INT REFERENCES admins(admin_id) ON DELETE CASCADE,
  name VARCHAR ( 50 ) NOT NULL,
  summary  VARCHAR ( 90 ) NOT NULL,
  detail TEXT NOT NULL,
  price INT NOT NULL,
  learning_time INT NOT NULL,
  cover_image_directory TEXT NOT NULL,
  video_trailer_directory TEXT NOT NULL,
  created_date TIMESTAMPTZ NOT NULL,
  updated_date TIMESTAMPTZ,
  category VARCHAR (25) NOT NULL
);

insert into courses (admin_id, name, summary, detail, price, learning_time, cover_image_directory, video_trailer_directory, created_date, updated_date, category) values (2, 'Chlidonias leucopterus', 'ultrices aliquet maecenas leo odio condimentum id luctus nec molestie sed', 'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.

Sed ante. Vivamus tortor. Duis mattis egestas metus.

Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.', 1460, 8, 'http://dummyimage.com/357x240.png/5fa2dd/ffffff', 'http://dummyimage.com/739x460.png/cc0000/ffffff', '2022-06-25T00:12:49Z', '2023-12-03T00:13:44Z', 'Crimson');
insert into courses (admin_id, name, summary, detail, price, learning_time, cover_image_directory, video_trailer_directory, created_date, updated_date, category) values (1, 'Trichechus inunguis', 'magnis dis parturient montes nascetur ridiculus mus etiam vel', 'Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.

Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.

Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.', 1829, 6, 'http://dummyimage.com/357x240.png/5fa2dd/ffffff', 'http://dummyimage.com/739x460.png/5fa2dd/ffffff', '2022-02-15T14:17:11Z', null, 'Violet');
insert into courses (admin_id, name, summary, detail, price, learning_time, cover_image_directory, video_trailer_directory, created_date, updated_date, category) values (1, 'Chelodina longicollis', 'justo eu massa donec dapibus duis at velit eu', 'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.

Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.

Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.', 1693, 8, 'http://dummyimage.com/357x240.png/dddddd/000000', 'http://dummyimage.com/739x460.png/5fa2dd/ffffff', '2022-04-30T04:43:08Z', '2022-07-08T04:43:52Z', 'Aquamarine');
insert into courses (admin_id, name, summary, detail, price, learning_time, cover_image_directory, video_trailer_directory, created_date, updated_date, category) values (1, 'Psophia viridis', 'vehicula condimentum curabitur in libero ut massa volutpat convallis morbi', 'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.

Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.

Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.', 2054, 6, 'http://dummyimage.com/357x240.png/dddddd/000000', 'http://dummyimage.com/739x460.png/dddddd/000000', '2022-06-01T14:39:35Z', '2024-04-18T14:39:48Z', 'Violet');
insert into courses (admin_id, name, summary, detail, price, learning_time, cover_image_directory, video_trailer_directory, created_date, updated_date, category) values (1, 'Grus canadensis', 'purus eu magna vulputate luctus cum sociis natoque penatibus et', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.

Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.

Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.', 3985, 8, 'http://dummyimage.com/357x240.png/dddddd/000000', 'http://dummyimage.com/739x460.png/ff4444/ffffff', '2022-05-03T06:51:41Z', '2023-05-30T06:52:24Z', 'Indigo');
insert into courses (admin_id, name, summary, detail, price, learning_time, cover_image_directory, video_trailer_directory, created_date, updated_date, category) values (3, 'Paradoxurus hermaphroditus', 'consequat metus sapien ut nunc vestibulum ante ipsum primis in faucibus', 'In congue. Etiam justo. Etiam pretium iaculis justo.

In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.

Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.', 3759, 10, 'http://dummyimage.com/357x240.png/5fa2dd/ffffff', 'http://dummyimage.com/739x460.png/5fa2dd/ffffff', '2021-11-25T14:13:39Z', '2023-12-22T14:14:36Z', 'Indigo');
insert into courses (admin_id, name, summary, detail, price, learning_time, cover_image_directory, video_trailer_directory, created_date, updated_date, category) values (2, 'Papio cynocephalus', 'ultrices posuere cubilia curae nulla dapibus dolor vel est donec', 'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.

Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.

Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.', 2538, 8, 'http://dummyimage.com/357x240.png/dddddd/000000', 'http://dummyimage.com/739x460.png/ff4444/ffffff', '2022-11-01T07:08:51Z', '2023-09-05T07:09:28Z', 'Fuscia');
insert into courses (admin_id, name, summary, detail, price, learning_time, cover_image_directory, video_trailer_directory, created_date, updated_date, category) values (3, 'Vulpes vulpes', 'integer ac neque duis bibendum morbi non quam nec dui', 'Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.

Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.

Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.', 2969, 10, 'http://dummyimage.com/357x240.png/5fa2dd/ffffff', 'http://dummyimage.com/739x460.png/ff4444/ffffff', '2022-01-26T14:40:05Z', '2023-10-13T14:40:25Z', 'Orange');
insert into courses (admin_id, name, summary, detail, price, learning_time, cover_image_directory, video_trailer_directory, created_date, updated_date, category) values (2, 'unavailable', 'massa quis augue luctus tincidunt nulla mollis molestie lorem', 'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.

Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.

Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.', 1714, 10, 'http://dummyimage.com/357x240.png/ff4444/ffffff', 'http://dummyimage.com/739x460.png/5fa2dd/ffffff', '2022-07-02T09:40:48Z', '2022-09-08T09:41:19Z', 'Mauv');
insert into courses (admin_id, name, summary, detail, price, learning_time, cover_image_directory, video_trailer_directory, created_date, updated_date, category) values (2, 'Felis serval', 'erat vestibulum sed magna at nunc commodo placerat praesent', 'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.

Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.

Phasellus in felis. Donec semper sapien a libero. Nam dui.', 3618, 7, 'http://dummyimage.com/357x240.png/5fa2dd/ffffff', 'http://dummyimage.com/739x460.png/ff4444/ffffff', '2021-11-04T19:53:48Z', '2023-11-14T19:54:27Z', 'Orange');
insert into courses (admin_id, name, summary, detail, price, learning_time, cover_image_directory, video_trailer_directory, created_date, updated_date, category) values (1, 'Plocepasser mahali', 'nulla sed accumsan felis ut at dolor quis odio consequat', 'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.

Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.

In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.', 3507, 8, 'http://dummyimage.com/357x240.png/dddddd/000000', 'http://dummyimage.com/739x460.png/cc0000/ffffff', '2022-02-05T05:35:50Z', null, 'Indigo');
insert into courses (admin_id, name, summary, detail, price, learning_time, cover_image_directory, video_trailer_directory, created_date, updated_date, category) values (1, 'Leptoptilus dubius', 'morbi non lectus aliquam sit amet diam in magna bibendum imperdiet', 'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.

Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.

Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.', 2089, 9, 'http://dummyimage.com/357x240.png/cc0000/ffffff', 'http://dummyimage.com/739x460.png/5fa2dd/ffffff', '2022-07-21T22:20:37Z', '2022-12-23T22:21:31Z', 'Blue');
insert into courses (admin_id, name, summary, detail, price, learning_time, cover_image_directory, video_trailer_directory, created_date, updated_date, category) values (1, 'Microcebus murinus', 'lorem integer tincidunt ante vel ipsum praesent blandit lacinia erat vestibulum', 'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.

In congue. Etiam justo. Etiam pretium iaculis justo.

In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.', 3385, 10, 'http://dummyimage.com/357x240.png/ff4444/ffffff', 'http://dummyimage.com/739x460.png/cc0000/ffffff', '2022-01-05T04:53:42Z', '2023-10-01T04:53:44Z', 'Goldenrod');
insert into courses (admin_id, name, summary, detail, price, learning_time, cover_image_directory, video_trailer_directory, created_date, updated_date, category) values (3, 'Macropus robustus', 'morbi non quam nec dui luctus rutrum nulla tellus in', 'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.

Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.

Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.', 3113, 7, 'http://dummyimage.com/357x240.png/5fa2dd/ffffff', 'http://dummyimage.com/739x460.png/5fa2dd/ffffff', '2022-07-06T22:58:18Z', '2024-01-24T22:58:42Z', 'Purple');
insert into courses (admin_id, name, summary, detail, price, learning_time, cover_image_directory, video_trailer_directory, created_date, updated_date, category) values (1, 'Vanellus sp.', 'a pede posuere nonummy integer non velit donec diam neque', 'In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.

Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.

Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.', 2160, 9, 'http://dummyimage.com/357x240.png/5fa2dd/ffffff', 'http://dummyimage.com/739x460.png/ff4444/ffffff', '2022-03-18T04:26:47Z', '2023-03-02T04:27:27Z', 'Fuscia');
insert into courses (admin_id, name, summary, detail, price, learning_time, cover_image_directory, video_trailer_directory, created_date, updated_date, category) values (2, 'Streptopelia senegalensis', 'nulla ut erat id mauris vulputate elementum nullam varius nulla facilisi cras', 'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.

Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.

Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.', 3973, 7, 'http://dummyimage.com/357x240.png/ff4444/ffffff', 'http://dummyimage.com/739x460.png/dddddd/000000', '2022-01-16T10:48:51Z', '2023-04-28T10:49:00Z', 'Violet');
insert into courses (admin_id, name, summary, detail, price, learning_time, cover_image_directory, video_trailer_directory, created_date, updated_date, category) values (3, 'Delphinus delphis', 'id ligula suspendisse ornare consequat lectus in est risus auctor', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.

Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.

Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.', 1338, 9, 'http://dummyimage.com/357x240.png/cc0000/ffffff', 'http://dummyimage.com/739x460.png/ff4444/ffffff', '2021-11-29T00:13:15Z', '2022-11-23T00:13:27Z', 'Crimson');
insert into courses (admin_id, name, summary, detail, price, learning_time, cover_image_directory, video_trailer_directory, created_date, updated_date, category) values (2, 'Phoeniconaias minor', 'vestibulum vestibulum ante ipsum primis in faucibus orci luctus', 'Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.

Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.

Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.', 3040, 8, 'http://dummyimage.com/357x240.png/cc0000/ffffff', 'http://dummyimage.com/739x460.png/cc0000/ffffff', '2021-11-04T20:41:05Z', '2023-06-26T20:41:11Z', 'Orange');
insert into courses (admin_id, name, summary, detail, price, learning_time, cover_image_directory, video_trailer_directory, created_date, updated_date, category) values (3, 'Panthera onca', 'elementum ligula vehicula consequat morbi a ipsum integer a nibh in', 'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.

In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.

Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.', 3228, 7, 'http://dummyimage.com/357x240.png/cc0000/ffffff', 'http://dummyimage.com/739x460.png/ff4444/ffffff', '2022-09-05T04:26:58Z', '2022-10-11T04:27:21Z', 'Goldenrod');
insert into courses (admin_id, name, summary, detail, price, learning_time, cover_image_directory, video_trailer_directory, created_date, updated_date, category) values (2, 'Papio ursinus', 'est et tempus semper est quam pharetra magna ac consequat metus', 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.

Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.

Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.', 1877, 7, 'http://dummyimage.com/357x240.png/5fa2dd/ffffff', 'http://dummyimage.com/739x460.png/cc0000/ffffff', '2022-08-27T15:53:07Z', null, 'Blue');
insert into courses (admin_id, name, summary, detail, price, learning_time, cover_image_directory, video_trailer_directory, created_date, updated_date, category) values (2, 'Nannopterum harrisi', 'pede ullamcorper augue a suscipit nulla elit ac nulla sed vel', 'Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.

Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.

Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.', 2649, 7, 'http://dummyimage.com/357x240.png/5fa2dd/ffffff', 'http://dummyimage.com/739x460.png/5fa2dd/ffffff', '2022-06-25T00:30:45Z', '2023-01-25T00:31:00Z', 'Goldenrod');
insert into courses (admin_id, name, summary, detail, price, learning_time, cover_image_directory, video_trailer_directory, created_date, updated_date, category) values (2, 'Martes americana', 'faucibus orci luctus et ultrices posuere cubilia curae duis faucibus accumsan odio', 'Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.

Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.

Fusce consequat. Nulla nisl. Nunc nisl.', 1349, 8, 'http://dummyimage.com/357x240.png/dddddd/000000', 'http://dummyimage.com/739x460.png/ff4444/ffffff', '2022-08-19T10:09:13Z', '2024-03-22T10:09:26Z', 'Puce');
insert into courses (admin_id, name, summary, detail, price, learning_time, cover_image_directory, video_trailer_directory, created_date, updated_date, category) values (2, 'Eolophus roseicapillus', 'ipsum praesent blandit lacinia erat vestibulum sed magna at nunc', 'Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.

Fusce consequat. Nulla nisl. Nunc nisl.

Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.', 2710, 7, 'http://dummyimage.com/357x240.png/cc0000/ffffff', 'http://dummyimage.com/739x460.png/5fa2dd/ffffff', '2022-10-01T06:36:05Z', '2024-01-16T06:36:14Z', 'Turquoise');
insert into courses (admin_id, name, summary, detail, price, learning_time, cover_image_directory, video_trailer_directory, created_date, updated_date, category) values (2, 'Aegypius tracheliotus', 'rutrum at lorem integer tincidunt ante vel ipsum praesent blandit lacinia', 'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.

Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.

Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.', 1979, 8, 'http://dummyimage.com/357x240.png/ff4444/ffffff', 'http://dummyimage.com/739x460.png/dddddd/000000', '2022-01-24T09:26:40Z', '2023-11-26T09:26:53Z', 'Fuscia');
insert into courses (admin_id, name, summary, detail, price, learning_time, cover_image_directory, video_trailer_directory, created_date, updated_date, category) values (1, 'Melanerpes erythrocephalus', 'sit amet eros suspendisse accumsan tortor quis turpis sed ante vivamus', 'Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.

Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.

Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.', 2554, 10, 'http://dummyimage.com/357x240.png/5fa2dd/ffffff', 'http://dummyimage.com/739x460.png/ff4444/ffffff', '2022-09-13T03:27:37Z', '2023-04-19T03:28:10Z', 'Teal');
insert into courses (admin_id, name, summary, detail, price, learning_time, cover_image_directory, video_trailer_directory, created_date, updated_date, category) values (3, 'Phoeniconaias minor', 'eget congue eget semper rutrum nulla nunc purus phasellus in felis', 'Phasellus in felis. Donec semper sapien a libero. Nam dui.

Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.

Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.', 3611, 10, 'http://dummyimage.com/357x240.png/cc0000/ffffff', 'http://dummyimage.com/739x460.png/cc0000/ffffff', '2022-03-01T05:44:26Z', null, 'Maroon');
insert into courses (admin_id, name, summary, detail, price, learning_time, cover_image_directory, video_trailer_directory, created_date, updated_date, category) values (3, 'Lamprotornis chalybaeus', 'tristique in tempus sit amet sem fusce consequat nulla nisl', 'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.

Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.

Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.', 3739, 7, 'http://dummyimage.com/357x240.png/cc0000/ffffff', 'http://dummyimage.com/739x460.png/cc0000/ffffff', '2022-05-07T02:04:36Z', '2022-09-29T02:05:14Z', 'Violet');
insert into courses (admin_id, name, summary, detail, price, learning_time, cover_image_directory, video_trailer_directory, created_date, updated_date, category) values (1, 'Bos frontalis', 'arcu libero rutrum ac lobortis vel dapibus at diam nam tristique tortor', 'Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.

In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.

Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.', 3802, 10, 'http://dummyimage.com/357x240.png/5fa2dd/ffffff', 'http://dummyimage.com/739x460.png/ff4444/ffffff', '2022-02-06T20:44:42Z', '2022-05-17T20:45:24Z', 'Turquoise');
insert into courses (admin_id, name, summary, detail, price, learning_time, cover_image_directory, video_trailer_directory, created_date, updated_date, category) values (2, 'Pycnonotus nigricans', 'pede lobortis ligula sit amet eleifend pede libero quis orci nullam', 'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.

Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.

Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.', 2575, 7, 'http://dummyimage.com/357x240.png/5fa2dd/ffffff', 'http://dummyimage.com/739x460.png/cc0000/ffffff', '2022-10-12T14:17:16Z', '2023-05-11T14:18:13Z', 'Orange');
insert into courses (admin_id, name, summary, detail, price, learning_time, cover_image_directory, video_trailer_directory, created_date, updated_date, category) values (2, 'Francolinus coqui', 'rutrum at lorem integer tincidunt ante vel ipsum praesent blandit lacinia erat', 'Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.

In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.

Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.', 1293, 9, 'http://dummyimage.com/357x240.png/ff4444/ffffff', 'http://dummyimage.com/739x460.png/dddddd/000000', '2022-06-09T04:25:36Z', '2022-09-13T04:25:47Z', 'Indigo');
insert into courses (admin_id, name, summary, detail, price, learning_time, cover_image_directory, video_trailer_directory, created_date, updated_date, category) values (1, 'Paraxerus cepapi', 'turpis adipiscing lorem vitae mattis nibh ligula nec sem duis', 'Fusce consequat. Nulla nisl. Nunc nisl.

Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.

In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.', 3035, 10, 'http://dummyimage.com/357x240.png/ff4444/ffffff', 'http://dummyimage.com/739x460.png/ff4444/ffffff', '2022-03-01T05:01:49Z', null, 'Crimson');
insert into courses (admin_id, name, summary, detail, price, learning_time, cover_image_directory, video_trailer_directory, created_date, updated_date, category) values (3, 'Gazella thompsonii', 'vel pede morbi porttitor lorem id ligula suspendisse ornare consequat lectus in', 'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.

Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.

Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.', 3647, 9, 'http://dummyimage.com/357x240.png/ff4444/ffffff', 'http://dummyimage.com/739x460.png/cc0000/ffffff', '2022-10-04T10:57:14Z', '2023-01-28T10:58:03Z', 'Pink');
insert into courses (admin_id, name, summary, detail, price, learning_time, cover_image_directory, video_trailer_directory, created_date, updated_date, category) values (2, 'Uraeginthus granatina', 'nascetur ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus', 'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.

Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.

Phasellus in felis. Donec semper sapien a libero. Nam dui.', 1866, 9, 'http://dummyimage.com/357x240.png/cc0000/ffffff', 'http://dummyimage.com/739x460.png/ff4444/ffffff', '2022-04-01T08:56:59Z', '2023-05-29T08:57:29Z', 'Pink');
insert into courses (admin_id, name, summary, detail, price, learning_time, cover_image_directory, video_trailer_directory, created_date, updated_date, category) values (3, 'Mirounga angustirostris', 'curabitur gravida nisi at nibh in hac habitasse platea dictumst', 'Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.

Fusce consequat. Nulla nisl. Nunc nisl.

Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.', 3845, 9, 'http://dummyimage.com/357x240.png/5fa2dd/ffffff', 'http://dummyimage.com/739x460.png/dddddd/000000', '2021-11-25T21:01:18Z', '2023-08-19T21:01:43Z', 'Red');
insert into courses (admin_id, name, summary, detail, price, learning_time, cover_image_directory, video_trailer_directory, created_date, updated_date, category) values (3, 'Motacilla aguimp', 'sed augue aliquam erat volutpat in congue etiam justo etiam pretium', 'Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.

In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.

Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.', 3503, 9, 'http://dummyimage.com/357x240.png/cc0000/ffffff', 'http://dummyimage.com/739x460.png/cc0000/ffffff', '2022-05-22T07:15:27Z', '2023-11-27T07:16:21Z', 'Yellow');
insert into courses (admin_id, name, summary, detail, price, learning_time, cover_image_directory, video_trailer_directory, created_date, updated_date, category) values (3, 'Bassariscus astutus', 'lorem ipsum dolor sit amet consectetuer adipiscing elit proin interdum mauris', 'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.

Sed ante. Vivamus tortor. Duis mattis egestas metus.

Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.', 3743, 6, 'http://dummyimage.com/357x240.png/ff4444/ffffff', 'http://dummyimage.com/739x460.png/5fa2dd/ffffff', '2022-06-20T19:06:18Z', '2022-09-09T19:07:08Z', 'Yellow');
insert into courses (admin_id, name, summary, detail, price, learning_time, cover_image_directory, video_trailer_directory, created_date, updated_date, category) values (1, 'Kobus defassa', 'nulla facilisi cras non velit nec nisi vulputate nonummy maecenas tincidunt', 'Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.

Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.

Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.', 3190, 9, 'http://dummyimage.com/357x240.png/5fa2dd/ffffff', 'http://dummyimage.com/739x460.png/dddddd/000000', '2021-11-30T04:25:28Z', '2022-02-13T04:25:42Z', 'Red');
insert into courses (admin_id, name, summary, detail, price, learning_time, cover_image_directory, video_trailer_directory, created_date, updated_date, category) values (3, 'Dromaeus novaehollandiae', 'non quam nec dui luctus rutrum nulla tellus in sagittis dui vel', 'Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.

Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.

Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.', 3943, 8, 'http://dummyimage.com/357x240.png/dddddd/000000', 'http://dummyimage.com/739x460.png/cc0000/ffffff', '2022-06-27T04:38:40Z', '2023-11-16T04:39:37Z', 'Aquamarine');
insert into courses (admin_id, name, summary, detail, price, learning_time, cover_image_directory, video_trailer_directory, created_date, updated_date, category) values (2, 'Damaliscus lunatus', 'lobortis convallis tortor risus dapibus augue vel accumsan tellus nisi eu orci', 'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.

Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.

Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.', 2348, 10, 'http://dummyimage.com/357x240.png/ff4444/ffffff', 'http://dummyimage.com/739x460.png/dddddd/000000', '2021-12-17T12:41:15Z', '2023-11-22T12:41:28Z', 'Mauv');
insert into courses (admin_id, name, summary, detail, price, learning_time, cover_image_directory, video_trailer_directory, created_date, updated_date, category) values (1, 'Dasypus novemcinctus', 'orci vehicula condimentum curabitur in libero ut massa volutpat', 'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.

Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.

Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.', 2244, 10, 'http://dummyimage.com/357x240.png/cc0000/ffffff', 'http://dummyimage.com/739x460.png/ff4444/ffffff', '2022-06-05T11:06:43Z', '2023-08-19T11:07:40Z', 'Fuscia');
insert into courses (admin_id, name, summary, detail, price, learning_time, cover_image_directory, video_trailer_directory, created_date, updated_date, category) values (3, 'Marmota flaviventris', 'eros suspendisse accumsan tortor quis turpis sed ante vivamus tortor duis', 'Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.

Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.

Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.', 1130, 7, 'http://dummyimage.com/357x240.png/ff4444/ffffff', 'http://dummyimage.com/739x460.png/dddddd/000000', '2021-11-17T18:44:53Z', '2022-01-01T18:45:52Z', 'Khaki');
insert into courses (admin_id, name, summary, detail, price, learning_time, cover_image_directory, video_trailer_directory, created_date, updated_date, category) values (3, 'Philetairus socius', 'nam congue risus semper porta volutpat quam pede lobortis ligula sit amet', 'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.

Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.

In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.', 2495, 9, 'http://dummyimage.com/357x240.png/5fa2dd/ffffff', 'http://dummyimage.com/739x460.png/ff4444/ffffff', '2021-12-24T20:41:16Z', '2022-03-19T20:41:37Z', 'Green');
insert into courses (admin_id, name, summary, detail, price, learning_time, cover_image_directory, video_trailer_directory, created_date, updated_date, category) values (1, 'Grus rubicundus', 'et commodo vulputate justo in blandit ultrices enim lorem ipsum dolor sit', 'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.

Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.

Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.', 3011, 10, 'http://dummyimage.com/357x240.png/dddddd/000000', 'http://dummyimage.com/739x460.png/cc0000/ffffff', '2022-06-20T10:00:40Z', '2023-02-14T10:00:56Z', 'Purple');
insert into courses (admin_id, name, summary, detail, price, learning_time, cover_image_directory, video_trailer_directory, created_date, updated_date, category) values (2, 'Choriotis kori', 'nulla ultrices aliquet maecenas leo odio condimentum id luctus', 'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.

Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.

Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.', 2128, 7, 'http://dummyimage.com/357x240.png/5fa2dd/ffffff', 'http://dummyimage.com/739x460.png/ff4444/ffffff', '2022-08-07T10:21:28Z', '2022-09-13T10:22:18Z', 'Yellow');
insert into courses (admin_id, name, summary, detail, price, learning_time, cover_image_directory, video_trailer_directory, created_date, updated_date, category) values (1, 'Dasypus novemcinctus', 'in sapien iaculis congue vivamus metus arcu adipiscing molestie', 'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.

In congue. Etiam justo. Etiam pretium iaculis justo.

In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.', 2904, 10, 'http://dummyimage.com/357x240.png/cc0000/ffffff', 'http://dummyimage.com/739x460.png/dddddd/000000', '2022-09-07T16:58:50Z', '2024-09-09T16:59:40Z', 'Aquamarine');
insert into courses (admin_id, name, summary, detail, price, learning_time, cover_image_directory, video_trailer_directory, created_date, updated_date, category) values (1, 'Francolinus coqui', 'nec euismod scelerisque quam turpis adipiscing lorem vitae mattis nibh ligula nec', 'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.

Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.

Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.', 1581, 8, 'http://dummyimage.com/357x240.png/cc0000/ffffff', 'http://dummyimage.com/739x460.png/dddddd/000000', '2021-12-20T00:17:22Z', '2022-06-02T00:17:41Z', 'Aquamarine');
insert into courses (admin_id, name, summary, detail, price, learning_time, cover_image_directory, video_trailer_directory, created_date, updated_date, category) values (3, 'Psophia viridis', 'faucibus orci luctus et ultrices posuere cubilia curae nulla', 'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.

Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.

Phasellus in felis. Donec semper sapien a libero. Nam dui.', 2747, 9, 'http://dummyimage.com/357x240.png/5fa2dd/ffffff', 'http://dummyimage.com/739x460.png/5fa2dd/ffffff', '2022-07-24T08:23:23Z', '2022-09-19T08:23:24Z', 'Puce');
insert into courses (admin_id, name, summary, detail, price, learning_time, cover_image_directory, video_trailer_directory, created_date, updated_date, category) values (3, 'Stercorarius longicausus', 'non velit nec nisi vulputate nonummy maecenas tincidunt lacus at velit vivamus', 'Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.

Phasellus in felis. Donec semper sapien a libero. Nam dui.

Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.', 2517, 9, 'http://dummyimage.com/357x240.png/dddddd/000000', 'http://dummyimage.com/739x460.png/cc0000/ffffff', '2022-02-13T14:59:28Z', '2022-08-04T15:00:13Z', 'Khaki');
insert into courses (admin_id, name, summary, detail, price, learning_time, cover_image_directory, video_trailer_directory, created_date, updated_date, category) values (2, 'Trichoglossus haematodus moluccanus', 'non sodales sed tincidunt eu felis fusce posuere felis sed lacus', 'Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.

Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.

Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.', 3818, 8, 'http://dummyimage.com/357x240.png/5fa2dd/ffffff', 'http://dummyimage.com/739x460.png/cc0000/ffffff', '2022-06-17T14:42:39Z', '2022-11-10T14:43:26Z', 'Puce');
insert into courses (admin_id, name, summary, detail, price, learning_time, cover_image_directory, video_trailer_directory, created_date, updated_date, category) values (3, 'Meles meles', 'amet nulla quisque arcu libero rutrum ac lobortis vel', 'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.

Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.

Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.', 3748, 10, 'http://dummyimage.com/357x240.png/5fa2dd/ffffff', 'http://dummyimage.com/739x460.png/cc0000/ffffff', '2022-09-09T16:38:13Z', '2023-10-02T16:38:23Z', 'Turquoise');
insert into courses (admin_id, name, summary, detail, price, learning_time, cover_image_directory, video_trailer_directory, created_date, updated_date, category) values (1, 'Columba livia', 'ipsum primis in faucibus orci luctus et ultrices posuere cubilia', 'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.

In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.

Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.', 1455, 6, 'http://dummyimage.com/357x240.png/cc0000/ffffff', 'http://dummyimage.com/739x460.png/cc0000/ffffff', '2022-03-12T01:20:01Z', '2023-11-26T01:20:18Z', 'Orange');
insert into courses (admin_id, name, summary, detail, price, learning_time, cover_image_directory, video_trailer_directory, created_date, updated_date, category) values (1, 'Trichoglossus haematodus moluccanus', 'pulvinar lobortis est phasellus sit amet erat nulla tempus vivamus in felis', 'In congue. Etiam justo. Etiam pretium iaculis justo.

In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.

Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.', 3684, 6, 'http://dummyimage.com/357x240.png/cc0000/ffffff', 'http://dummyimage.com/739x460.png/cc0000/ffffff', '2021-12-01T03:09:40Z', '2023-01-02T03:09:42Z', 'Goldenrod');
insert into courses (admin_id, name, summary, detail, price, learning_time, cover_image_directory, video_trailer_directory, created_date, updated_date, category) values (1, 'Threskionis aethiopicus', 'in hac habitasse platea dictumst maecenas ut massa quis augue', 'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.

Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.

In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.', 2843, 6, 'http://dummyimage.com/357x240.png/cc0000/ffffff', 'http://dummyimage.com/739x460.png/cc0000/ffffff', '2022-05-08T12:00:00Z', '2023-10-20T12:00:19Z', 'Purple');
insert into courses (admin_id, name, summary, detail, price, learning_time, cover_image_directory, video_trailer_directory, created_date, updated_date, category) values (1, 'Colobus guerza', 'pharetra magna vestibulum aliquet ultrices erat tortor sollicitudin mi sit', 'Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.

Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.

Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.', 2154, 8, 'http://dummyimage.com/357x240.png/cc0000/ffffff', 'http://dummyimage.com/739x460.png/ff4444/ffffff', '2021-11-05T10:53:32Z', '2022-07-09T10:54:20Z', 'Maroon');
insert into courses (admin_id, name, summary, detail, price, learning_time, cover_image_directory, video_trailer_directory, created_date, updated_date, category) values (3, 'Macropus fuliginosus', 'justo eu massa donec dapibus duis at velit eu est congue', 'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.

Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.

Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.', 2129, 8, 'http://dummyimage.com/357x240.png/dddddd/000000', 'http://dummyimage.com/739x460.png/cc0000/ffffff', '2022-10-03T06:59:00Z', null, 'Red');
insert into courses (admin_id, name, summary, detail, price, learning_time, cover_image_directory, video_trailer_directory, created_date, updated_date, category) values (1, 'Limosa haemastica', 'ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia', 'Fusce consequat. Nulla nisl. Nunc nisl.

Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.

In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.', 2528, 8, 'http://dummyimage.com/357x240.png/cc0000/ffffff', 'http://dummyimage.com/739x460.png/5fa2dd/ffffff', '2022-01-17T17:17:53Z', '2023-09-05T17:18:37Z', 'Purple');
insert into courses (admin_id, name, summary, detail, price, learning_time, cover_image_directory, video_trailer_directory, created_date, updated_date, category) values (2, 'Picoides pubescens', 'ullamcorper purus sit amet nulla quisque arcu libero rutrum ac lobortis', 'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.

Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.

Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.', 3871, 10, 'http://dummyimage.com/357x240.png/dddddd/000000', 'http://dummyimage.com/739x460.png/dddddd/000000', '2022-03-19T01:38:21Z', '2023-09-15T01:39:11Z', 'Crimson');
insert into courses (admin_id, name, summary, detail, price, learning_time, cover_image_directory, video_trailer_directory, created_date, updated_date, category) values (1, 'Gopherus agassizii', 'ligula vehicula consequat morbi a ipsum integer a nibh in', 'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.

Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.

Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.', 2758, 7, 'http://dummyimage.com/357x240.png/ff4444/ffffff', 'http://dummyimage.com/739x460.png/cc0000/ffffff', '2022-03-29T11:23:19Z', '2023-01-06T11:24:16Z', 'Green');
insert into courses (admin_id, name, summary, detail, price, learning_time, cover_image_directory, video_trailer_directory, created_date, updated_date, category) values (1, 'Aquila chrysaetos', 'aliquam convallis nunc proin at turpis a pede posuere', 'In congue. Etiam justo. Etiam pretium iaculis justo.

In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.

Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.', 3793, 10, 'http://dummyimage.com/357x240.png/cc0000/ffffff', 'http://dummyimage.com/739x460.png/5fa2dd/ffffff', '2021-12-25T01:24:19Z', '2023-11-30T01:24:28Z', 'Maroon');
insert into courses (admin_id, name, summary, detail, price, learning_time, cover_image_directory, video_trailer_directory, created_date, updated_date, category) values (2, 'Phacochoerus aethiopus', 'ut massa quis augue luctus tincidunt nulla mollis molestie lorem quisque ut', 'Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.

Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.

In congue. Etiam justo. Etiam pretium iaculis justo.', 1428, 6, 'http://dummyimage.com/357x240.png/ff4444/ffffff', 'http://dummyimage.com/739x460.png/5fa2dd/ffffff', '2021-11-08T09:18:58Z', null, 'Yellow');
insert into courses (admin_id, name, summary, detail, price, learning_time, cover_image_directory, video_trailer_directory, created_date, updated_date, category) values (2, 'Anitibyx armatus', 'pede posuere nonummy integer non velit donec diam neque vestibulum eget vulputate', 'In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.

Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.

Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.', 2165, 7, 'http://dummyimage.com/357x240.png/dddddd/000000', 'http://dummyimage.com/739x460.png/5fa2dd/ffffff', '2022-04-20T17:26:46Z', '2023-01-23T17:27:11Z', 'Yellow');
insert into courses (admin_id, name, summary, detail, price, learning_time, cover_image_directory, video_trailer_directory, created_date, updated_date, category) values (2, 'Paraxerus cepapi', 'convallis nunc proin at turpis a pede posuere nonummy', 'Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.

Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.

Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.', 3207, 8, 'http://dummyimage.com/357x240.png/cc0000/ffffff', 'http://dummyimage.com/739x460.png/5fa2dd/ffffff', '2022-08-26T19:19:01Z', '2023-01-08T19:19:41Z', 'Violet');
insert into courses (admin_id, name, summary, detail, price, learning_time, cover_image_directory, video_trailer_directory, created_date, updated_date, category) values (3, 'Genetta genetta', 'pellentesque eget nunc donec quis orci eget orci vehicula condimentum curabitur in', 'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.

Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.

Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.', 2356, 10, 'http://dummyimage.com/357x240.png/ff4444/ffffff', 'http://dummyimage.com/739x460.png/5fa2dd/ffffff', '2022-10-14T16:49:02Z', null, 'Indigo');
insert into courses (admin_id, name, summary, detail, price, learning_time, cover_image_directory, video_trailer_directory, created_date, updated_date, category) values (2, 'Ardea golieth', 'ipsum primis in faucibus orci luctus et ultrices posuere cubilia', 'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.

Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.

Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.', 1308, 10, 'http://dummyimage.com/357x240.png/dddddd/000000', 'http://dummyimage.com/739x460.png/cc0000/ffffff', '2022-03-27T21:22:28Z', '2024-01-04T21:22:37Z', 'Aquamarine');
insert into courses (admin_id, name, summary, detail, price, learning_time, cover_image_directory, video_trailer_directory, created_date, updated_date, category) values (3, 'Plectopterus gambensis', 'amet consectetuer adipiscing elit proin interdum mauris non ligula', 'Fusce consequat. Nulla nisl. Nunc nisl.

Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.

In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.', 3673, 9, 'http://dummyimage.com/357x240.png/ff4444/ffffff', 'http://dummyimage.com/739x460.png/5fa2dd/ffffff', '2021-11-25T10:59:05Z', '2023-01-25T10:59:50Z', 'Fuscia');
insert into courses (admin_id, name, summary, detail, price, learning_time, cover_image_directory, video_trailer_directory, created_date, updated_date, category) values (1, 'unavailable', 'maecenas leo odio condimentum id luctus nec molestie sed justo', 'Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.

Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.

Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.', 2996, 9, 'http://dummyimage.com/357x240.png/cc0000/ffffff', 'http://dummyimage.com/739x460.png/5fa2dd/ffffff', '2022-03-12T16:26:33Z', '2022-05-08T16:27:06Z', 'Blue');
insert into courses (admin_id, name, summary, detail, price, learning_time, cover_image_directory, video_trailer_directory, created_date, updated_date, category) values (3, 'Alcelaphus buselaphus caama', 'ac diam cras pellentesque volutpat dui maecenas tristique est et', 'Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.

Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.

Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.', 3557, 9, 'http://dummyimage.com/357x240.png/ff4444/ffffff', 'http://dummyimage.com/739x460.png/dddddd/000000', '2022-09-28T19:12:05Z', '2023-11-01T19:12:31Z', 'Goldenrod');
insert into courses (admin_id, name, summary, detail, price, learning_time, cover_image_directory, video_trailer_directory, created_date, updated_date, category) values (3, 'Isoodon obesulus', 'tortor duis mattis egestas metus aenean fermentum donec ut mauris eget massa', 'In congue. Etiam justo. Etiam pretium iaculis justo.

In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.

Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.', 1952, 9, 'http://dummyimage.com/357x240.png/ff4444/ffffff', 'http://dummyimage.com/739x460.png/5fa2dd/ffffff', '2021-11-17T07:50:45Z', null, 'Yellow');
insert into courses (admin_id, name, summary, detail, price, learning_time, cover_image_directory, video_trailer_directory, created_date, updated_date, category) values (1, 'Ceryle rudis', 'dolor vel est donec odio justo sollicitudin ut suscipit', 'Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.

Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.

Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.', 3915, 8, 'http://dummyimage.com/357x240.png/5fa2dd/ffffff', 'http://dummyimage.com/739x460.png/5fa2dd/ffffff', '2022-07-31T08:28:29Z', '2024-04-21T08:28:58Z', 'Fuscia');
insert into courses (admin_id, name, summary, detail, price, learning_time, cover_image_directory, video_trailer_directory, created_date, updated_date, category) values (3, 'Papio cynocephalus', 'aliquet ultrices erat tortor sollicitudin mi sit amet lobortis', 'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.

Sed ante. Vivamus tortor. Duis mattis egestas metus.

Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.', 3715, 10, 'http://dummyimage.com/357x240.png/dddddd/000000', 'http://dummyimage.com/739x460.png/5fa2dd/ffffff', '2022-07-26T11:48:31Z', '2024-01-06T11:48:55Z', 'Red');
insert into courses (admin_id, name, summary, detail, price, learning_time, cover_image_directory, video_trailer_directory, created_date, updated_date, category) values (2, 'Panthera onca', 'eleifend donec ut dolor morbi vel lectus in quam fringilla rhoncus', 'Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.

Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.

Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.', 1097, 7, 'http://dummyimage.com/357x240.png/dddddd/000000', 'http://dummyimage.com/739x460.png/5fa2dd/ffffff', '2022-10-15T18:49:11Z', null, 'Fuscia');
insert into courses (admin_id, name, summary, detail, price, learning_time, cover_image_directory, video_trailer_directory, created_date, updated_date, category) values (2, 'Castor canadensis', 'pellentesque at nulla suspendisse potenti cras in purus eu magna', 'Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.

In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.

Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.', 3782, 8, 'http://dummyimage.com/357x240.png/dddddd/000000', 'http://dummyimage.com/739x460.png/ff4444/ffffff', '2021-12-25T10:29:19Z', '2023-08-23T10:29:23Z', 'Blue');
insert into courses (admin_id, name, summary, detail, price, learning_time, cover_image_directory, video_trailer_directory, created_date, updated_date, category) values (2, 'Bettongia penicillata', 'nulla eget eros elementum pellentesque quisque porta volutpat erat quisque', 'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.

Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.

Phasellus in felis. Donec semper sapien a libero. Nam dui.', 1359, 9, 'http://dummyimage.com/357x240.png/dddddd/000000', 'http://dummyimage.com/739x460.png/dddddd/000000', '2022-03-21T11:06:43Z', '2022-10-29T11:07:35Z', 'Aquamarine');
insert into courses (admin_id, name, summary, detail, price, learning_time, cover_image_directory, video_trailer_directory, created_date, updated_date, category) values (3, 'Macaca mulatta', 'maecenas pulvinar lobortis est phasellus sit amet erat nulla', 'Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.

Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.

Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.', 3217, 7, 'http://dummyimage.com/357x240.png/ff4444/ffffff', 'http://dummyimage.com/739x460.png/cc0000/ffffff', '2022-03-28T10:09:07Z', null, 'Mauv');
insert into courses (admin_id, name, summary, detail, price, learning_time, cover_image_directory, video_trailer_directory, created_date, updated_date, category) values (3, 'Martes pennanti', 'vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere', 'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.

Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.

Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.', 2194, 6, 'http://dummyimage.com/357x240.png/5fa2dd/ffffff', 'http://dummyimage.com/739x460.png/ff4444/ffffff', '2022-07-25T19:54:40Z', '2022-10-24T19:55:37Z', 'Green');
insert into courses (admin_id, name, summary, detail, price, learning_time, cover_image_directory, video_trailer_directory, created_date, updated_date, category) values (1, 'Canis aureus', 'pede posuere nonummy integer non velit donec diam neque vestibulum', 'Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.

In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.

Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.', 1167, 10, 'http://dummyimage.com/357x240.png/cc0000/ffffff', 'http://dummyimage.com/739x460.png/cc0000/ffffff', '2022-03-28T03:45:35Z', '2024-03-15T03:46:00Z', 'Purple');
insert into courses (admin_id, name, summary, detail, price, learning_time, cover_image_directory, video_trailer_directory, created_date, updated_date, category) values (3, 'Isoodon obesulus', 'nullam molestie nibh in lectus pellentesque at nulla suspendisse potenti', 'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.

Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.

Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.', 2843, 9, 'http://dummyimage.com/357x240.png/cc0000/ffffff', 'http://dummyimage.com/739x460.png/ff4444/ffffff', '2022-01-12T10:30:51Z', '2023-11-01T10:31:35Z', 'Mauv');
insert into courses (admin_id, name, summary, detail, price, learning_time, cover_image_directory, video_trailer_directory, created_date, updated_date, category) values (1, 'Bettongia penicillata', 'pellentesque ultrices phasellus id sapien in sapien iaculis congue vivamus metus arcu', 'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.

Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.

Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.', 1386, 8, 'http://dummyimage.com/357x240.png/dddddd/000000', 'http://dummyimage.com/739x460.png/ff4444/ffffff', '2022-06-08T01:21:19Z', '2024-07-01T01:21:40Z', 'Aquamarine');
insert into courses (admin_id, name, summary, detail, price, learning_time, cover_image_directory, video_trailer_directory, created_date, updated_date, category) values (2, 'Butorides striatus', 'ut rhoncus aliquet pulvinar sed nisl nunc rhoncus dui', 'Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.

Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.

Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.', 1929, 10, 'http://dummyimage.com/357x240.png/ff4444/ffffff', 'http://dummyimage.com/739x460.png/ff4444/ffffff', '2022-01-07T06:50:48Z', null, 'Goldenrod');
insert into courses (admin_id, name, summary, detail, price, learning_time, cover_image_directory, video_trailer_directory, created_date, updated_date, category) values (3, 'Felis concolor', 'aliquet ultrices erat tortor sollicitudin mi sit amet lobortis sapien sapien', 'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.

Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.

Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.', 2728, 10, 'http://dummyimage.com/357x240.png/5fa2dd/ffffff', 'http://dummyimage.com/739x460.png/cc0000/ffffff', '2022-03-05T09:38:52Z', '2022-09-14T09:38:54Z', 'Fuscia');
insert into courses (admin_id, name, summary, detail, price, learning_time, cover_image_directory, video_trailer_directory, created_date, updated_date, category) values (1, 'Cervus unicolor', 'sapien urna pretium nisl ut volutpat sapien arcu sed', 'Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.

Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.

Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.', 3738, 10, 'http://dummyimage.com/357x240.png/dddddd/000000', 'http://dummyimage.com/739x460.png/cc0000/ffffff', '2022-08-13T11:30:09Z', '2024-08-22T11:31:04Z', 'Purple');
insert into courses (admin_id, name, summary, detail, price, learning_time, cover_image_directory, video_trailer_directory, created_date, updated_date, category) values (2, 'Arctogalidia trivirgata', 'ut blandit non interdum in ante vestibulum ante ipsum primis in faucibus', 'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.

In congue. Etiam justo. Etiam pretium iaculis justo.

In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.', 3151, 8, 'http://dummyimage.com/357x240.png/ff4444/ffffff', 'http://dummyimage.com/739x460.png/cc0000/ffffff', '2022-01-05T04:30:11Z', '2022-03-12T04:30:36Z', 'Violet');
insert into courses (admin_id, name, summary, detail, price, learning_time, cover_image_directory, video_trailer_directory, created_date, updated_date, category) values (3, 'Canis lupus baileyi', 'vel augue vestibulum ante ipsum primis in faucibus orci luctus et', 'Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.

Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.

Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.', 3891, 10, 'http://dummyimage.com/357x240.png/ff4444/ffffff', 'http://dummyimage.com/739x460.png/5fa2dd/ffffff', '2022-03-21T09:52:27Z', '2023-01-14T09:52:49Z', 'Crimson');
insert into courses (admin_id, name, summary, detail, price, learning_time, cover_image_directory, video_trailer_directory, created_date, updated_date, category) values (2, 'Larus fuliginosus', 'quis tortor id nulla ultrices aliquet maecenas leo odio condimentum id luctus', 'Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.

Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.

Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.', 2785, 9, 'http://dummyimage.com/357x240.png/cc0000/ffffff', 'http://dummyimage.com/739x460.png/dddddd/000000', '2022-06-13T21:22:23Z', '2023-01-28T21:22:24Z', 'Teal');
insert into courses (admin_id, name, summary, detail, price, learning_time, cover_image_directory, video_trailer_directory, created_date, updated_date, category) values (2, 'Gorilla gorilla', 'curabitur at ipsum ac tellus semper interdum mauris ullamcorper purus', 'In congue. Etiam justo. Etiam pretium iaculis justo.

In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.

Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.', 2853, 10, 'http://dummyimage.com/357x240.png/cc0000/ffffff', 'http://dummyimage.com/739x460.png/dddddd/000000', '2022-04-11T04:47:09Z', '2023-08-21T04:47:15Z', 'Indigo');
insert into courses (admin_id, name, summary, detail, price, learning_time, cover_image_directory, video_trailer_directory, created_date, updated_date, category) values (2, 'Haliaetus leucogaster', 'ipsum primis in faucibus orci luctus et ultrices posuere', 'Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.

Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.

Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.', 2980, 9, 'http://dummyimage.com/357x240.png/cc0000/ffffff', 'http://dummyimage.com/739x460.png/5fa2dd/ffffff', '2022-06-07T00:11:49Z', '2024-04-28T00:12:02Z', 'Indigo');
insert into courses (admin_id, name, summary, detail, price, learning_time, cover_image_directory, video_trailer_directory, created_date, updated_date, category) values (3, 'Vanellus chilensis', 'sapien placerat ante nulla justo aliquam quis turpis eget', 'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.

Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.

Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.', 3181, 10, 'http://dummyimage.com/357x240.png/ff4444/ffffff', 'http://dummyimage.com/739x460.png/cc0000/ffffff', '2022-08-30T16:18:44Z', '2023-02-12T16:18:46Z', 'Violet');
insert into courses (admin_id, name, summary, detail, price, learning_time, cover_image_directory, video_trailer_directory, created_date, updated_date, category) values (2, 'Cebus apella', 'duis ac nibh fusce lacus purus aliquet at feugiat', 'Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.

Phasellus in felis. Donec semper sapien a libero. Nam dui.

Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.', 3103, 7, 'http://dummyimage.com/357x240.png/ff4444/ffffff', 'http://dummyimage.com/739x460.png/dddddd/000000', '2022-09-21T13:21:07Z', null, 'Pink');
insert into courses (admin_id, name, summary, detail, price, learning_time, cover_image_directory, video_trailer_directory, created_date, updated_date, category) values (3, 'Gekko gecko', 'pellentesque eget nunc donec quis orci eget orci vehicula condimentum curabitur', 'Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.

Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.

Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.', 3125, 6, 'http://dummyimage.com/357x240.png/ff4444/ffffff', 'http://dummyimage.com/739x460.png/dddddd/000000', '2022-05-31T07:33:53Z', '2022-10-21T07:34:07Z', 'Turquoise');
insert into courses (admin_id, name, summary, detail, price, learning_time, cover_image_directory, video_trailer_directory, created_date, updated_date, category) values (2, 'Corythornis cristata', 'in faucibus orci luctus et ultrices posuere cubilia curae duis', 'Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.

Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.

Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.', 3834, 9, 'http://dummyimage.com/357x240.png/dddddd/000000', 'http://dummyimage.com/739x460.png/ff4444/ffffff', '2022-06-20T08:27:39Z', '2023-01-14T08:28:37Z', 'Crimson');
insert into courses (admin_id, name, summary, detail, price, learning_time, cover_image_directory, video_trailer_directory, created_date, updated_date, category) values (1, 'Antilope cervicapra', 'ante vivamus tortor duis mattis egestas metus aenean fermentum donec', 'Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.

Phasellus in felis. Donec semper sapien a libero. Nam dui.

Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.', 1697, 7, 'http://dummyimage.com/357x240.png/dddddd/000000', 'http://dummyimage.com/739x460.png/ff4444/ffffff', '2022-02-16T11:52:24Z', '2023-04-09T11:53:15Z', 'Orange');
insert into courses (admin_id, name, summary, detail, price, learning_time, cover_image_directory, video_trailer_directory, created_date, updated_date, category) values (3, 'Gyps bengalensis', 'in hac habitasse platea dictumst etiam faucibus cursus urna ut tellus', 'Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.

Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.

In congue. Etiam justo. Etiam pretium iaculis justo.', 2755, 7, 'http://dummyimage.com/357x240.png/cc0000/ffffff', 'http://dummyimage.com/739x460.png/5fa2dd/ffffff', '2022-02-14T23:37:07Z', '2023-10-02T23:37:31Z', 'Maroon');
insert into courses (admin_id, name, summary, detail, price, learning_time, cover_image_directory, video_trailer_directory, created_date, updated_date, category) values (2, 'Macropus giganteus', 'amet consectetuer adipiscing elit proin risus praesent lectus vestibulum quam', 'Sed ante. Vivamus tortor. Duis mattis egestas metus.

Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.

Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.', 1950, 9, 'http://dummyimage.com/357x240.png/dddddd/000000', 'http://dummyimage.com/739x460.png/5fa2dd/ffffff', '2022-02-27T15:09:10Z', null, 'Fuscia');
insert into courses (admin_id, name, summary, detail, price, learning_time, cover_image_directory, video_trailer_directory, created_date, updated_date, category) values (2, 'Globicephala melas', 'eleifend quam a odio in hac habitasse platea dictumst maecenas ut massa', 'Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.

Phasellus in felis. Donec semper sapien a libero. Nam dui.

Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.', 1795, 10, 'http://dummyimage.com/357x240.png/dddddd/000000', 'http://dummyimage.com/739x460.png/dddddd/000000', '2021-11-24T23:35:37Z', '2023-04-22T23:36:15Z', 'Green');
insert into courses (admin_id, name, summary, detail, price, learning_time, cover_image_directory, video_trailer_directory, created_date, updated_date, category) values (3, 'Dasyurus maculatus', 'platea dictumst aliquam augue quam sollicitudin vitae consectetuer eget rutrum at', 'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.

Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.

Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.', 3179, 10, 'http://dummyimage.com/357x240.png/dddddd/000000', 'http://dummyimage.com/739x460.png/ff4444/ffffff', '2022-07-02T01:24:17Z', '2024-05-09T01:24:25Z', 'Purple');
insert into courses (admin_id, name, summary, detail, price, learning_time, cover_image_directory, video_trailer_directory, created_date, updated_date, category) values (1, 'Galago crassicaudataus', 'felis ut at dolor quis odio consequat varius integer ac leo pellentesque', 'Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.

Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.

Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.', 2720, 9, 'http://dummyimage.com/357x240.png/dddddd/000000', 'http://dummyimage.com/739x460.png/5fa2dd/ffffff', '2021-12-11T23:27:43Z', null, 'Goldenrod');
insert into courses (admin_id, name, summary, detail, price, learning_time, cover_image_directory, video_trailer_directory, created_date, updated_date, category) values (2, 'Hystrix cristata', 'ac enim in tempor turpis nec euismod scelerisque quam', 'Phasellus in felis. Donec semper sapien a libero. Nam dui.

Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.

Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.', 3606, 8, 'http://dummyimage.com/357x240.png/dddddd/000000', 'http://dummyimage.com/739x460.png/ff4444/ffffff', '2022-10-22T00:25:10Z', '2023-03-27T00:26:08Z', 'Mauv');
insert into courses (admin_id, name, summary, detail, price, learning_time, cover_image_directory, video_trailer_directory, created_date, updated_date, category) values (2, 'Alopex lagopus', 'nisi vulputate nonummy maecenas tincidunt lacus at velit vivamus', 'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.

Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.

Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.', 1874, 8, 'http://dummyimage.com/357x240.png/ff4444/ffffff', 'http://dummyimage.com/739x460.png/dddddd/000000', '2022-06-01T19:43:58Z', '2024-03-24T19:44:10Z', 'Teal');
insert into courses (admin_id, name, summary, detail, price, learning_time, cover_image_directory, video_trailer_directory, created_date, updated_date, category) values (1, 'Pelecans onocratalus', 'nulla nunc purus phasellus in felis donec semper sapien a', 'Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.

Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.

Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.', 2596, 9, 'http://dummyimage.com/357x240.png/ff4444/ffffff', 'http://dummyimage.com/739x460.png/ff4444/ffffff', '2022-02-11T11:28:28Z', '2023-08-04T11:28:37Z', 'Mauv');
insert into courses (admin_id, name, summary, detail, price, learning_time, cover_image_directory, video_trailer_directory, created_date, updated_date, category) values (2, 'Erinaceus frontalis', 'dui nec nisi volutpat eleifend donec ut dolor morbi vel lectus', 'Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.

Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.

Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.', 1000, 9, 'http://dummyimage.com/357x240.png/5fa2dd/ffffff', 'http://dummyimage.com/739x460.png/ff4444/ffffff', '2022-07-10T01:23:42Z', '2023-12-11T01:24:24Z', 'Indigo');