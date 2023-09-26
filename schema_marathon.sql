create database marathon;

create schema marathon;

----------------- Create Table ------------------------------------

create  table schedule (id serial primary key,
tittle varchar not null,
timeset varchar(50));

create table dishes (id serial primary key,
tittle varchar not null,
recipe_id integer,
UNIQUE (recipe_id));

create table marathon (id serial primary key,
week_id integer not null,
day_id integer not null,
schedule_id integer not null,
value varchar null,
dishes_id integer not null,
check (day_id>0 and day_id<6 ));

create table cooking (id serial primary key,
dish_id integer not null,
description varchar);

-- TO DO Split ingridienst
/*
create table ingredients (id serial primary key,
ingredient varchar not null,
unique (ingredient));
*/

-------------------Insert data ------------------------------------

insert into schedule (tittle, timeset) values ('Сніданок', '07:00-08:00');
insert into schedule (tittle, timeset) values ('Перекус', '10:30-11:30');
insert into schedule (tittle, timeset) values ('Обід', '13:00-14:00');
insert into schedule (tittle, timeset) values ('Перекус', '16:30-17:30');
insert into schedule (tittle, timeset) values ('Вечеря', '19:00-20:00');

insert into dishes (tittle, recipe_id) values ('Торт "Київський"', 1);
insert into dishes (tittle, recipe_id) values ('Чебуреки"', 2);
insert into dishes (tittle, recipe_id) values ('Полтавські галушки з м’ясом', 3);
insert into dishes (tittle, recipe_id) values ('Млинці з м’ясом/печінкою та грибами', 5);
insert into dishes (tittle, recipe_id) values ('Крученики з сиром', 6);
insert into dishes (tittle, recipe_id) values ('Рибний періг', 7);
insert into dishes (tittle, recipe_id) values ('Фрукти', 8);
insert into dishes (tittle, recipe_id) values ('Пастила', 9);
insert into dishes (tittle, recipe_id) values ('Перекус', 10);

-- Week 1
----Monday
insert into marathon (week_id, day_id, schedule_id, dishes_id, value) values (1, 1, 1, 1, '50%');
insert into marathon (week_id, day_id, schedule_id, dishes_id, value) values (1, 1, 1, 2, '50%');
insert into marathon (week_id, day_id, schedule_id, dishes_id, value) values (1, 1, 2, 9, null);
insert into marathon (week_id, day_id, schedule_id, dishes_id, value) values (1, 1, 3, 3, '50%');
insert into marathon (week_id, day_id, schedule_id, dishes_id, value) values (1, 1, 3, 4, '50%');
insert into marathon (week_id, day_id, schedule_id, dishes_id, value) values (1, 1, 4, 7, 'до 100гр./1р');
insert into marathon (week_id, day_id, schedule_id, dishes_id, value) values (1, 1, 4, 8, 'до 20гр./1р');
insert into marathon (week_id, day_id, schedule_id, dishes_id, value) values (1, 1, 5, 5, '50%');
insert into marathon (week_id, day_id, schedule_id, dishes_id, value) values (1, 1, 5, 6, '50%');

insert into marathon (week_id, day_id, schedule_id, dishes_id, value) values (1, 2, 1, 1, '50%');
insert into marathon (week_id, day_id, schedule_id, dishes_id, value) values (1, 2, 1, 2, '50%');
insert into marathon (week_id, day_id, schedule_id, dishes_id, value) values (1, 2, 2, 9, null);
insert into marathon (week_id, day_id, schedule_id, dishes_id, value) values (1, 2, 3, 3, '50%');
insert into marathon (week_id, day_id, schedule_id, dishes_id, value) values (1, 2, 3, 4, '50%');
insert into marathon (week_id, day_id, schedule_id, dishes_id, value) values (1, 2, 4, 7, 'до 100гр./1р');
insert into marathon (week_id, day_id, schedule_id, dishes_id, value) values (1, 2, 4, 8, 'до 20гр./1р');
insert into marathon (week_id, day_id, schedule_id, dishes_id, value) values (1, 2, 5, 5, '50%');
insert into marathon (week_id, day_id, schedule_id, dishes_id, value) values (1, 2, 5, 6, '50%');


-- TO DO Split ingridienst
/*
insert into ingredients (ingredient) values ('Яйця');
insert into ingredients (ingredient) values ('Молоко');
insert into ingredients (ingredient) values ('Борошно рисове');
insert into ingredients (ingredient) values ('Цукор');
insert into ingredients (ingredient) values ('Горіхи кешью');
insert into ingredients (ingredient) values ('Кукурудзяний крохмаль');
insert into ingredients (ingredient) values ('Творог');
insert into ingredients (ingredient) values ('Какао');
insert into ingredients (ingredient) values ('Сметана');
*/

insert into cooking (description, dish_id) values ('<div>
 <h3>Інгредієнти на бісквіт</h3>
 <ul>
<li>Яйця - 2шт
<li>Молоко - 30гр
<li>Борошно рисове - 20гр
<li>Цукор - 15гр
<li>Горіхи кешью - 20гр
 </ul>
 <h3>Інгредієнти на крем 1</h3>
 <ul>
<li>Молоко - 100гр
<li>Кукурудзяний крохмаль - 10гр
<li>Цукор - 10гр
</ul>
<h3>Інгредієнти на крем 2</h3>
<ul>
<li>Творог 5% - 150гр
<li>Какао - 10гр
<li>Сметана 10% - 30гр
<li>Цукор - 15гр
</ul>
<h3>Приготування</h3>
<p>Спочатку приготуємо бісквіт. 
<p>Яйця розділити на білки та жовтки. Білки покласти в суху ємність. Жовтки змішати з молоком та просіяти сухі інгредієнти. Горіхи подрібнити. Білки збити з цукром до міцних піків. Жовточну масу поєднати з білочною, додати горіхи. Обережно перемішати. Я випікала з цього тіста 2 окремі бісквіти. По 15хв при 180°.
<p>Для крему 1 поєднати всі інгредієнти та уварити на вогні до загустіння. Перший корж намастити кремом 1. 
<p>Для крему 2 какао поєднати зі сметаною та уварити на вогні до стану розтопленого шоколаду. Поєднайте шоколадну масу з творог та цукром. 
<p>Нанесіть на боки торта та на другий бісквіт. Як робила я розповідаю. Зробила шоколад. Творог поєднала з цукром та творожну масу поділила на 4 частини. 50% крему поєднала з шоколадом. 30% крему залишила на посадку країв та візерунок ромбиком. 10% крему поєднала з рожевим барвником. 10% крему поєднала з зеленим барвником.
</div>', 1);


insert into cooking (description, dish_id) values ('<div>
<h2>Чебуреки</h2>
<h3>Інгредієнти</h3>
<ul>
<li>Лаваш – 100гр (4 кола по 25гр)
<li>Куряче філе - 240гр
<li>Яйце - 1шт
<li>Цибуля - 30гр
<li>Оливкова олія -1ч.л.
</ul>
<h3>Приготування</h3>
<p>Візьміть тонкий м`який та еластичний лаваш. Він не повинен бути ламким, а також на ньому не повинно бути пошкоджень, інакше сік витікатиме при обсмажуванні, і буде дуже багато бризок.
<p>Можна одразу взяти лаваш кругом, можна вирізати за допомогою тарілки.
<p>Куряче філе перебиваємо у фарш із цибулею. Солимо, перчимо, перемішуємо, додаємо трохи води.
<p>Виделкою збийте яйце і добре намажте краєчка круглого коржика, завдяки яйцю вони склеяться, і сік не випливатиме назовні. Викладіть тонкий шар фаршу на один бік коржика не доходячи 1,5-2 см до краю. Накрийте другою частиною лаваша. Ретельно зліпіть краї, але при цьому не порвіть лаваш.
<p>Смажити на краплі оливкової олії на сковороді по 5 хвилин із кожного боку. Або можна запекти в духовці 15 хвилин при 180°. Яйцем можна потім змастити лаваш і ще раз обсмажити.
</div>', 2);	

--------------------Select ---------------------------------------------

select * from schedule;

select * from dishes;

select m.week_id, m.day_id, s.tittle, s.timeset, d.tittle, m.value, d.recipe_id  
	from marathon m 
		inner join schedule s on m.schedule_id = s.id 
		inner join dishes d on m.dishes_id = d.id; 
		
		

