### Markie

> Веб-приложение для ведения заметок в формате Markdown

---

## Development

```
1.
$ git clone git@github.com:Perm-Lizards/Markie.git

2. Установить и запустить PostgreSQL

3. Скопировать файл `appsettings.Development.example.json` в `appsettings.Development.json`, и заполнить :)
```

### Frontend

```
$ cd ./Client

$ npm i

$ npm run dev
```

### Backend

#### EF Core | Миграции

```
> dotnet ef migrations add <MigrationName>

> dotnet ef migrations update
```

#### TypeGen | C# POCO -> TypeScript types

Для работы в консоли требуется установить инструмент: \
`dotnet tool install --global dotnet-typegen --version 4.5.0`

Запускать исключительно после сборки бэка. Если изменили C# POCO, то снова собираем проект, потом запускаем

```
> dotnet-typegen -v generate
```

Как это работает: в папке Server лежит файл `tgconfig.json` - там понятно дело конфига, и в поле `generationSpecs` - указан класс, где добавляются модели для генерации. Туда-то и надо добавлять модели, чтобы они потом генерились в TypeScript. Класс находится по пути `Server.Configuration.TypeGen.CustomGenerationSpec`

---
