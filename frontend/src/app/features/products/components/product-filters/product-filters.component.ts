import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

interface FilterOptions {
    category: string | null;
    brand: string | null;
    minPrice: number | null;
    maxPrice: number | null;
    inStockOnly: boolean;
}

@Component({
    selector: 'app-product-filters',
    templateUrl: './product-filters.component.html',
    styleUrls: ['./product-filters.component.scss']
})
export class ProductFiltersComponent implements OnInit {
    @Input() filters: FilterOptions | null = null;
    @Output() filtersChange = new EventEmitter<Partial<FilterOptions>>();
    @Output() reset = new EventEmitter<void>();

    filterForm!: FormGroup;

    categories = [
        'Tênis',
        'Roupas',
        'Acessórios',
        'Equipamentos',
        'Suplementos'
    ];

    brands = [
        'Nike',
        'Adidas',
        'Puma',
        'Reebok',
        'Under Armour',
        'Mizuno',
        'Asics'
    ];

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.initializeForm();
        this.setupFormSubscription();
    }

    private initializeForm(): void {
        this.filterForm = this.fb.group({
            category: [this.filters?.category || null],
            brand: [this.filters?.brand || null],
            minPrice: [this.filters?.minPrice || null],
            maxPrice: [this.filters?.maxPrice || null],
            inStockOnly: [this.filters?.inStockOnly || false]
        });
    }

    private setupFormSubscription(): void {
        this.filterForm.valueChanges.subscribe(values => {
            this.filtersChange.emit(values);
        });
    }

    onReset(): void {
        this.filterForm.reset({
            category: null,
            brand: null,
            minPrice: null,
            maxPrice: null,
            inStockOnly: false
        });
        this.reset.emit();
    }
}