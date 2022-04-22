# Servicios para NOTRIABO

## Comandos

### Cargar datos de tabla de alimentos de bolivia

Descargar archivo `TABLA_DE_COMPOSICION_DE_ALIMENTOS_BOLIVIANA_2005.tsv` y correr el siguiente comando

```
python manage.py load_tsv_data --tsv_path=[DIRECTORY]/TABLA_DE_COMPOSICION_DE_ALIMENTOS_BOLIVIANA_2005.tsv
```

### set Categoria de Alimentos

```
python manage.py set_category_data --id_category=4 --start_id=333 --end_id=341
```