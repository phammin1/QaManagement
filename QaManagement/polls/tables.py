# -*- coding: utf-8 -*-
import django_tables2 as tables
from .models import QaItem
from django.utils.safestring import mark_safe

class QaItemTable(tables.Table):
    class Meta:
        model = QaItem
        attrs = {"class": "paleblue"}
        
    def render_id(self, value):
        htmlTag = '<a href="/polls/{0}">{0}</a>'.format(value)
        return mark_safe(htmlTag)

